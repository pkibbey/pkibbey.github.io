import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, '..', 'src/content');

// Default gradient if none is specified
const defaultGradient = 'linear-gradient(to bottom right, #00DC82 0%, #36E4DA 50%, #0047E1 100%)';

// Required fields and their default values
const requiredFields = {
  title: (data) => data.title || 'Untitled',
  description: (data) => data.description || 'No description provided',
  author: () => 'Phineas',
  pubDate: (data) => {
    if (!data.pubDate) {
      // Try to get date from git or use current date
      return new Date().toISOString();
    }
    return data.pubDate;
  },
  color: () => defaultGradient,
  tags: () => []
};

function validateAndFixFrontmatter(data, filePath) {
  const fixed = { ...data };
  let wasUpdated = false;

  // Check and fix each required field
  for (const [field, getDefault] of Object.entries(requiredFields)) {
    if (!fixed[field]) {
      fixed[field] = getDefault(data);
      wasUpdated = true;
      console.log(`Added missing ${field} to ${path.basename(filePath)}`);
    }
  }

  // Ensure date format is correct
  if (fixed.pubDate && !(fixed.pubDate instanceof Date)) {
    try {
      fixed.pubDate = new Date(fixed.pubDate).toISOString();
      wasUpdated = true;
      console.log(`Fixed pubDate format in ${path.basename(filePath)}`);
    } catch (e) {
      console.error(`Invalid pubDate in ${path.basename(filePath)}`);
    }
  }

  if (fixed.updatedDate && !(fixed.updatedDate instanceof Date)) {
    try {
      fixed.updatedDate = new Date(fixed.updatedDate).toISOString();
      wasUpdated = true;
      console.log(`Fixed updatedDate format in ${path.basename(filePath)}`);
    } catch (e) {
      console.error(`Invalid updatedDate in ${path.basename(filePath)}`);
    }
  }

  // Ensure color is a valid gradient
  if (!fixed.color?.startsWith('linear-gradient(')) {
    fixed.color = defaultGradient;
    wasUpdated = true;
    console.log(`Fixed invalid color in ${path.basename(filePath)}`);
  }

  // Ensure tags is an array
  if (!Array.isArray(fixed.tags)) {
    fixed.tags = [];
    wasUpdated = true;
    console.log(`Fixed invalid tags in ${path.basename(filePath)}`);
  }

  return { fixed, wasUpdated };
}

const dirs = ['blog', 'projects'];

for (const dir of dirs) {
  const dirPath = path.join(contentDir, dir);
  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdown } = matter(content);

    const { fixed, wasUpdated } = validateAndFixFrontmatter(data, filePath);

    if (wasUpdated) {
      const newContent = matter.stringify(markdown, fixed);
      fs.writeFileSync(filePath, newContent);
      console.log(`Updated metadata in ${file}`);
    } else {
      console.log(`No updates needed for ${file}`);
    }
  }
}
