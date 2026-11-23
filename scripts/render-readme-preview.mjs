#!/usr/bin/env node
/**
 * Renders README.md to PNG previews (GitHub-like dark/light chrome).
 * Usage: node scripts/render-readme-preview.mjs [--readme path] [--out dir] [--label name]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readmeArg = process.argv.indexOf("--readme");
const outArg = process.argv.indexOf("--out");
const labelArg = process.argv.indexOf("--label");

const readmePath = readmeArg >= 0 ? path.resolve(process.argv[readmeArg + 1]) : path.join(root, "README.md");
const outDir = outArg >= 0 ? path.resolve(process.argv[outArg + 1]) : "/opt/cursor/artifacts";
const label = labelArg >= 0 ? process.argv[labelArg + 1] : "preview";

const readmeMd = fs.readFileSync(readmePath, "utf8");
const bodyHtml = marked.parse(readmeMd, { gfm: true, breaks: false });

function shell(theme) {
  const isDark = theme === "dark";
  const bg = isDark ? "#0d1117" : "#ffffff";
  const fg = isDark ? "#e6edf3" : "#1f2328";
  const link = isDark ? "#4493f8" : "#0969da";
  const border = isDark ? "#30363d" : "#d0d7de";
  const muted = isDark ? "#8b949e" : "#656d76";
  const assetBase = `file://${root}/`;

  return `<!DOCTYPE html>
<html lang="en" data-color-mode="${theme}" data-light-theme="light" data-dark-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="color-scheme" content="${isDark ? "dark" : "light"}" />
  <base href="${assetBase}" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px 40px 48px;
      max-width: 980px;
      background: ${bg};
      color: ${fg};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    a { color: ${link}; text-decoration: none; }
    a:hover { text-decoration: underline; }
    h1,h2,h3 { font-weight: 600; line-height: 1.25; margin-top: 24px; margin-bottom: 16px; }
    h3 { font-size: 1.25em; }
    p { margin-top: 0; margin-bottom: 16px; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 16px; font-size: 14px; }
    th, td { border: 1px solid ${border}; padding: 8px 13px; }
    th { font-weight: 600; background: ${isDark ? "#161b22" : "#f6f8fa"}; }
    img, picture, video { max-width: 100%; }
    details { margin: 16px 0; border: 1px solid ${border}; border-radius: 6px; padding: 8px 12px; }
    summary { cursor: pointer; font-weight: 600; }
    sub { color: ${muted}; font-size: 12px; }
    hr { border: 0; border-top: 1px solid ${border}; margin: 24px 0; }
    .markdown-body img { background: transparent; }
  </style>
</head>
<body class="markdown-body">
${bodyHtml}
</body>
</html>`;
}

const { chromium } = await import("playwright");

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const theme of ["dark", "light"]) {
  const htmlPath = path.join(outDir, `.tmp-readme-${theme}.html`);
  fs.writeFileSync(htmlPath, shell(theme));
  const page = await browser.newPage({ viewport: { width: 980, height: 900 } });
  await page.emulateMedia({ colorScheme: theme });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  if (theme === "dark") {
    await page.waitForTimeout(800);
  }
  const height = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewportSize({ width: 980, height: Math.min(Math.max(height + 40, 400), 12000) });
  const outFile = path.join(outDir, `${label}-${theme}.png`);
  await page.screenshot({ path: outFile, fullPage: true });
  await page.close();
  fs.unlinkSync(htmlPath);
}

await browser.close();
console.log(`Wrote ${label}-dark.png and ${label}-light.png to ${outDir}`);