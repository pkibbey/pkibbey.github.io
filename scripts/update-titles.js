import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, '..', 'src/content');

const titleUpdates = {
  // Blog posts
  'ai-code-review.md': 'AI Reviews Code',
  'ai-engineering.md': 'Engineering Intelligence',
  'design-systems.md': 'Design at Scale',
  'edge-computing.md': 'Edge Computing Evolves',
  'micro-frontends.md': 'Breaking Monoliths',
  'monorepos.md': 'Monorepo Magic',
  'react-compiler.md': 'Optimizing React',
  'scaling-social-networks.md': 'Networks That Scale',
  'smart-home-development.md': 'Smart Living',
  'teaching-coding.md': 'Teaching Tomorrow',
  'tech-moves-fast.md': 'Technology Never Sleeps',
  'ui-testing.md': 'Better Testing',
  'web-performance.md': 'Performance Matters',
  'web-rendering.md': 'Modern Rendering',
  'webassembly.md': 'WebAssembly Revolution',
  
  // Project posts
  'ai-analytics.md': 'Data Stories',
  'arduino-robot-football.md': 'Robot Soccer',
  'cereal-science.md': 'Engineering Breakfast',
  'faceparty.md': 'Social Network Pioneer',
  'mixing-music.md': 'Digital Sound',
  'photography.md': 'Capturing Moments'
};

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdown } = matter(content);
  const filename = path.basename(filePath);
  
  if (!titleUpdates[filename]) {
    console.warn(`No title update found for ${filename}`);
    return;
  }

  const newData = {
    ...data,
    title: titleUpdates[filename]
  };

  const newContent = matter.stringify(markdown, newData);
  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${filename}: "${titleUpdates[filename]}"`);
}

const dirs = ['blog', 'projects'];

for (const dir of dirs) {
  const dirPath = path.join(contentDir, dir);
  if (!fs.existsSync(dirPath)) continue;
  
  const files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(dirPath, file));
    
  for (const file of files) {
    processFile(file);
  }
}
