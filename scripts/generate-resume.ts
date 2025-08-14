#!/usr/bin/env tsx
/*
 * Script: generate-resume.ts
 * Generates a PDF resume pulling from exported data objects: userData, projectsData, timelineData, skillsData.
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const require = createRequire(import.meta.url);

// Basic types (lightweight) to avoid pulling in React / JSX since the data files include JSX for logos in timeline.
// We'll guard against non-string items when serializing timeline logos.

// Derive a plain timeline entry shape after dynamic load (defined inside generator)
type TimelineEntry = { role: string; company: string; period?: string; details?: string[] };

type Options = {
  output?: string;
};

async function generateResume({ output = 'resume.pdf' }: Options = {}) {
  // Always emit the resume into the public folder so it can be served statically
  const publicDir = path.resolve(process.cwd(), 'public');
  try { fs.mkdirSync(publicDir, { recursive: true }); } catch { /* ignore */ }
  const outPath = path.join(publicDir, output);
  const doc = new PDFDocument({ margin: 36 }); // 32pt (~0.5") margin for cleaner text block
  const writeStream = fs.createWriteStream(outPath);
  doc.pipe(writeStream);

  // Minimal React stub for TSX modules
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as unknown as { React?: unknown }).React = (globalThis as unknown as { React?: unknown }).React || {
    // createElement stub to satisfy JSX transpilation
    createElement: (...args: unknown[]) => ({ _ignored: true, args }),
    Fragment: 'fragment'
  };

  // Dynamic loads (CommonJS transpiled by tsx)
  const { userData } = require('../src/components/Hero');
  const { projectsData } = require('../src/components/ProjectSpotlight');
  const { timelineData } = require('../src/components/CareerTimeline');
  const { skillsData } = require('../src/components/SkillsDashboard');

  // Register Inter font weights using TTF files (supported by PDFKit)
  const ttfDir = path.resolve(process.cwd(), 'public', 'fonts', 'inter', 'ttf');
  const ttfMap: Record<string, string> = {
    extralight: 'Inter-ExtraLight.ttf',
    light: 'Inter-Light.ttf',
    regular: 'Inter-Regular.ttf',
    medium: 'Inter-Medium.ttf',
    semibold: 'Inter-SemiBold.ttf',
    bold: 'Inter-Bold.ttf',
    extrabold: 'Inter-ExtraBold.ttf',
  };
  Object.entries(ttfMap).forEach(([key, file]) => {
    const p = path.join(ttfDir, file);
    try {
      if (fs.existsSync(p)) doc.registerFont(`inter-${key}`, p);
    } catch {
      /* ignore */
    }
  });

  // Assume fonts registered; if not, fall back to default by leaving undefined.
  const fonts: Record<string, string | undefined> = {
    extralight: 'inter-extralight',
    light: 'inter-light',
    regular: 'inter-regular',
    medium: 'inter-medium',
    semibold: 'inter-semibold',
    bold: 'inter-bold',
    extrabold: 'inter-extrabold',
  };

  // Typography definitions centralizing all text styling
  const type = {
    heading1: { size: 40, lineHeight: 40 * 1.1, font: fonts.semibold, tracking: -0.075 },
    heading2: { size: 28, lineHeight: 28 * 1.15, font: fonts.extralight, tracking: -0.05 },
    caption: { size: 14, lineHeight: 14 * 1.1, font: fonts.regular, tracking: 0 },
    body: { size: 12, lineHeight: 12 * 1.4, font: fonts.regular, tracking: 0 },
    bodyStrong: { size: 12, lineHeight: 12 * 1.4, font: fonts.semibold || fonts.bold || fonts.medium, tracking: 0 },
    projectTitle: { size: 13, lineHeight: 13 * 1.3, font: fonts.semibold || fonts.bold || fonts.medium, tracking: 0 },
    bullet: { size: 12, lineHeight: 12 * 1.4, font: fonts.regular, tracking: 0 },
    small: { size: 10, lineHeight: 10 * 1.4, font: fonts.regular, tracking: 0 },
  } as const;

  const spacing = {
    afterHeading1: 8,
    afterCaption: 16,
    sectionTop: 16,
    sectionGapTight: 8,
    skillLineGap: 0,
  } as const;

  // Name (heading-1 style)
  styledText(doc, userData.name, type.heading1, { color: '#111', marginBottom: spacing.afterHeading1 });

  // Bio (caption style)
  styledText(doc, userData.bio, type.caption, { color: '#333', marginBottom: spacing.afterCaption });

  // Contact line: email • site • location
  const contactParts = [
    {
      text: userData.site,
      style: type.small,
      color: "#0a4d8c",
      link: userData.site.startsWith("http")
        ? userData.site
        : `https://${userData.site}`,
    },
    { text: "  •  ", style: type.small, color: "#999" },
    { text: userData.location, style: type.small, color: "#555" },
  ];
  multiStyledLine(doc, contactParts, { marginBottom: 8 });

  section(doc, 'Skills & Expertise', { type, spacing });
  Object.entries(skillsData as Record<string, string[]>).forEach(([category, skills]) => {
    multiStyledLine(doc, [
      { text: `${category}: `, style: type.bodyStrong, color: '#111' },
      { text: skills.join(', '), style: type.body, color: '#555' }
    ]);
    addExactSpace(doc, spacing.skillLineGap);
  });
  addExactSpace(doc, 8);
  section(doc, 'Career Journey', { type, spacing });
  (timelineData as unknown as TimelineEntry[]).forEach((raw) => {
    const { role, company, period, details } = raw;
  styledText(doc, `${role} – ${company}${period ? ` (${period})` : ''}`, type.bodyStrong, { color: '#111', marginBottom: 2 });
    if (Array.isArray(details)) {
      details.forEach((d: string) => bullet(doc, d, type.body));
    }
    addExactSpace(doc, 10);
  });
  section(doc, 'Project Spotlight', { type, spacing });
  (projectsData as unknown as { title: string; url: string; description: string; tags?: string[] }[]).forEach(p => {
  styledText(doc, p.title, type.projectTitle, { color: '#111', marginBottom: 2, link: p.url });
    styledText(doc, p.description, type.body, { color: '#333', marginBottom: 2 });
    if (p.tags?.length) {
      styledText(doc, p.tags.join('  •  '), type.small, { color: '#0a4d8c', marginBottom: 0 });
    }
    addExactSpace(doc, 12);
  });

  doc.end();

  return new Promise<string>((resolve, reject) => {
    writeStream.on('finish', () => resolve(outPath));
    writeStream.on('error', reject);
  });
}

interface TextStyle { size: number; lineHeight: number; font?: string; tracking?: number }
interface SectionCtx { type: { heading1: TextStyle; heading2: TextStyle; caption: TextStyle; body: TextStyle; bodyStrong: TextStyle; projectTitle: TextStyle; bullet: TextStyle; small: TextStyle }; spacing: { sectionTop: number; sectionGapTight: number } }

function section(doc: PDFKit.PDFDocument, title: string, ctx: SectionCtx) {
  addExactSpace(doc, ctx.spacing.sectionTop);
  styledText(doc, title, ctx.type.heading2, { color: '#111', marginBottom: ctx.spacing.sectionGapTight });
}

function styledText(
  doc: PDFKit.PDFDocument,
  text: string,
  style: TextStyle,
  opts: { color?: string; marginBottom?: number; link?: string; transform?: (s: string) => string } = {}
) {
  if (style.font) doc.font(style.font);
  doc.fontSize(style.size);
  const lineGap = Math.max(0, style.lineHeight - style.size);
  const content = opts.transform ? opts.transform(text) : text;
  const characterSpacing = typeof style.tracking === 'number' ? style.size * style.tracking : 0;
  doc.fillColor(opts.color || '#000').text(content, { lineGap, link: opts.link, // @ts-ignore: characterSpacing unofficial in types
    characterSpacing });
  if (opts.marginBottom) addExactSpace(doc, opts.marginBottom);
}

function addExactSpace(doc: PDFKit.PDFDocument, pts: number) { doc.y += pts; }

function bullet(doc: PDFKit.PDFDocument, text: string, style: TextStyle) {
  const baseX = doc.page.margins.left;
  const bulletOffset = 4;     // distance from left margin to bullet center horizontally
  const textIndent = 14;      // start of text block relative to left margin
  let y = doc.y;
  const lineHeight = style.lineHeight;

  // Ensure there's room for at least the first line of bullet text on this page
  // to avoid drawing the bullet on one page and flowing the text to the next.
  const availableHeight = doc.page.height - doc.page.margins.bottom - y;
  if (availableHeight <= lineHeight + 0.5) {
    doc.addPage();
    y = doc.y; // reset y after page break
  }

  // Draw bullet (radius proportional to font size for visual balance)
  doc.save();
  const bulletRadius = Math.max(1.6, style.size * 0.16);
  doc
			.circle(
				baseX + bulletOffset,
				y + lineHeight / 2 - (bulletRadius / 2),
				bulletRadius,
			)
			.fill("#111");
  doc.restore();

  // Text block
  const available = doc.page.width - doc.page.margins.right - (baseX + textIndent);
  if (style.font) doc.font(style.font);
  doc
    .fontSize(style.size)
    .fillColor('#454545')
    .text(text, baseX + textIndent, y, { width: available, lineGap: Math.max(0, lineHeight - style.size) });

  // Ensure consistent next line start
  if (doc.y - y < lineHeight) {
    doc.y = y + lineHeight;
  }
  doc.x = baseX;
}

// Renders a single line composed of multiple styled segments sequentially.
function multiStyledLine(
  doc: PDFKit.PDFDocument,
  parts: { text: string; style: TextStyle; color?: string; link?: string }[],
  opts: { marginBottom?: number } = {}
) {
  const startY = doc.y;
  parts.forEach((part, idx) => {
    if (part.style.font) doc.font(part.style.font);
    doc.fontSize(part.style.size);
    const lineGap = Math.max(0, part.style.lineHeight - part.style.size);
    const characterSpacing = typeof part.style.tracking === 'number' ? part.style.size * part.style.tracking : 0;
    doc.fillColor(part.color || '#000').text(part.text, { continued: idx < parts.length - 1, lineGap, link: part.link, // @ts-ignore
      characterSpacing });
  });
  // Ensure correct vertical advance if shortest style lineHeight differs
  const maxLineHeight = Math.max(...parts.map(p => p.style.lineHeight));
  if (doc.y - startY < maxLineHeight) doc.y = startY + maxLineHeight;
  if (opts.marginBottom) addExactSpace(doc, opts.marginBottom);
}

if ((require as unknown as { main: unknown }).main === module) {
  (async () => {
    const outputArgIndex = process.argv.indexOf('--out');
    let output: string | undefined;
    if (outputArgIndex !== -1 && process.argv[outputArgIndex + 1]) {
      output = process.argv[outputArgIndex + 1];
    }
    try {
      const p = await generateResume({ output });
      console.log(`Resume generated: ${p}`);
    } catch (err) {
      console.error('Failed to generate resume:', err);
      process.exit(1);
    }
  })();
}
