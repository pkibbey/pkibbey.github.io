import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { parse as parseYaml } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract frontmatter from markdown files
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? parseYaml(match[1]) : null;
}

// Function to get slug from filename
export function getSlug(filename) {
  return filename.replace(/\.md$/, '');
}

// Function to get gradient colors from color string
function getGradientColors(color) {
  const match = color.match(/linear-gradient\(to .+?, (.+?), (.+?)\)/);
  return match ? [match[1], match[2]] : ['#000000', '#000000'];
}

// Function to read all markdown files and generate image configs
async function generateImageConfigs() {
  const contentDir = path.join(__dirname, '..', 'src', 'content');
  const configs = [];

  // Read both blog and projects directories
  for (const dir of ['blog', 'projects']) {
    const dirPath = path.join(contentDir, dir);
    const files = await fs.promises.readdir(dirPath);

    for (const file of files) {
      if (file.endsWith('.md')) {
        const content = await fs.promises.readFile(
          path.join(dirPath, file),
          'utf-8',
        );
        const frontmatter = extractFrontmatter(content);

        if (frontmatter?.color) {
          const name = getSlug(file);
          const gradient = getGradientColors(frontmatter.color);

          configs.push({
            name,
            gradient,
            text: generateShortTitle(frontmatter.title),
          });
        }
      }
    }
  }

  return configs;
}

// Image dimensions (16:9 aspect ratio)
const width = 1200;
const height = Math.floor((width * 9) / 16);

async function generateHeroImage({ name, gradient, text }) {
  // Create the hero directory if it doesn't exist
  const heroDir = path.join(__dirname, '..', 'public', 'hero');
  await fs.promises.mkdir(heroDir, { recursive: true });

  const outputPath = path.join(heroDir, `${name}.jpg`);

  const svg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${gradient[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${gradient[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text
        x="50%"
        y="53%"
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        font-size="72"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >${text}</text>
    </svg>
  `;

  await sharp(Buffer.from(svg)).jpeg().toFile(outputPath);

  console.log(`Generated hero image: ${name}.jpg`);
}

async function generateAllImages() {
  const images = await generateImageConfigs();
  for (const image of images) {
    await generateHeroImage(image);
  }
}

generateAllImages().catch(console.error);
