import { createClient } from 'pexels';
import fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// You'll need to get this from https://www.pexels.com/api/
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
if (!PEXELS_API_KEY) {
  console.error('Please set PEXELS_API_KEY in your .env file');
  process.exit(1);
}
const client = createClient(PEXELS_API_KEY);

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const writeStream = createWriteStream(filepath);
          response.pipe(writeStream);
          writeStream.on('finish', () => {
            writeStream.close();
            resolve();
          });
        } else {
          response.resume();
          reject(new Error(`Failed to download image: ${response.statusCode}`));
        }
      })
      .on('error', reject);
  });
}

async function getContentFiles(directory) {
  const contentDir = path.join(process.cwd(), 'src/content', directory);
  const files = await fs.readdir(contentDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map(async (file) => {
      const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
      const frontmatter = content.split('---')[1];
      const data = {};
      for (const line of frontmatter.split('\n')) {
        if (line.includes(':')) {
          const [key, ...value] = line.split(':');
          data[key.trim()] = value
            .join(':')
            .trim()
            .replace(/^['"]|['"]$/g, '');
        }
      }
      return {
        slug: file.replace('.md', ''),
        data,
      };
    });
}

async function generateImages() {
  try {
    // Get all blog posts and projects
    const blogPosts = await Promise.all(await getContentFiles('blog'));
    const projectFiles = await Promise.all(await getContentFiles('projects'));
    const allContent = [...blogPosts, ...projectFiles];

    // Create public/images directory if it doesn't exist
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    await fs.mkdir(imagesDir, { recursive: true });

    for (const content of allContent) {
      const { slug, data } = content;
      const tags = data.tags
        ? data.tags
            .replace(/[\[\]']/g, '')
            .split(',')
            .map((t) => t.trim())
        : [];

      // Skip if no tags
      if (!tags || tags.length === 0) continue;

      // Create search query from tags
      const searchQuery = tags.join(' ');

      try {
        // Search for an image
        const searchResult = await client.photos.search({
          query: searchQuery,
          per_page: 1,
          orientation: 'landscape',
        });

        if (searchResult.photos && searchResult.photos.length > 0) {
          const photo = searchResult.photos[0];
          const imageUrl = photo.src.large2x;
          const imageFilename = `${slug}.jpg`;
          const imagePath = path.join(imagesDir, imageFilename);

          // Download the image
          await downloadImage(imageUrl, imagePath);
          console.log(`✓ Downloaded image for ${slug}`);

          // Optional: Update the markdown file to use the new image path
          // This would require parsing and modifying the frontmatter
        } else {
          console.log(`✗ No image found for ${slug}`);
        }

        // Respect rate limiting
        await new Promise((resolve) => setTimeout(resolve, 250));
      } catch (error) {
        console.error(`Error processing ${slug}:`, error);
      }
    }

    console.log('Image generation complete!');
  } catch (error) {
    console.error('Failed to generate images:', error);
  }
}

generateImages();
