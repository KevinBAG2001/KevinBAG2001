import fs from "node:fs";
import path from "node:path";

const USERNAME = process.env.GITHUB_USERNAME || process.env.GITHUB_REPOSITORY_OWNER || "KevinBAG2001";
const TOKEN = process.env.GITHUB_TOKEN;
const YEAR = new Date().getUTCFullYear();
const README_PATH = path.join(process.cwd(), "README.md");
const STATS_DARK = path.join(process.cwd(), "assets/readme/stats-dark.svg");
const STATS_LIGHT = path.join(process.cwd(), "assets/readme/stats-light.svg");
const START_MARKER = "<!-- STATS:START -->";
const END_MARKER = "<!-- STATS:END -->";

async function githubApi(apiPath) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
  }

  const response = await fetch(`https://api.github.com${apiPath}`, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${apiPath}: ${response.status} ${body}`);
  }
  return response.json();
}

function buildStatsSvg({ publicRepos, commitsYtd, pullRequestsYtd, stars }, theme) {
  const dark = theme === "dark";
  const bg = dark ? "#101010" : "#fcfcfc";
  const stroke = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const eyebrow = dark ? "#E8E6DC" : "#111411";
  const num = dark ? "#E8E6DC" : "#111411";
  const label = dark ? "#9a9a9a" : "#6F6F6F";
  const rule = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const eyebrowOpacity = dark ? "0.45" : "0.45";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="896" height="128" viewBox="0 0 896 128" role="img" aria-label="GitHub public metrics">
  <rect width="896" height="128" rx="20" fill="${bg}" stroke="${stroke}" stroke-width="1"/>
  <text x="48" y="36" fill="${eyebrow}" opacity="${eyebrowOpacity}" font-family="system-ui,sans-serif" font-size="10" font-weight="600" letter-spacing="1.6">GITHUB · PUBLIC METRICS · ${YEAR}</text>
  <g font-family="system-ui,sans-serif" text-anchor="middle">
    <text x="160" y="88" fill="${num}" font-size="40" font-weight="300" letter-spacing="-1">${publicRepos}</text>
    <text x="160" y="108" fill="${label}" font-size="11" font-weight="500" letter-spacing="0.8">REPOS</text>
    <text x="352" y="88" fill="${num}" font-size="40" font-weight="300" letter-spacing="-1">${commitsYtd}</text>
    <text x="352" y="108" fill="${label}" font-size="11" font-weight="500" letter-spacing="0.8">COMMITS</text>
    <text x="544" y="88" fill="${num}" font-size="40" font-weight="300" letter-spacing="-1">${pullRequestsYtd}</text>
    <text x="544" y="108" fill="${label}" font-size="11" font-weight="500" letter-spacing="0.8">PULL REQUESTS</text>
    <text x="736" y="88" fill="${num}" font-size="40" font-weight="300" letter-spacing="-1">${stars}</text>
    <text x="736" y="108" fill="${label}" font-size="11" font-weight="500" letter-spacing="0.8">STARS</text>
  </g>
  <line x1="256" y1="52" x2="256" y2="112" stroke="${rule}"/>
  <line x1="448" y1="52" x2="448" y2="112" stroke="${rule}"/>
  <line x1="640" y1="52" x2="640" y2="112" stroke="${rule}"/>
</svg>
`;
}

function formatStatsBlock(updatedAt) {
  return [
    "",
    "Public metrics from the GitHub API (public repositories only). GitLab activity lives on [my GitLab profile](https://gitlab.com/KevinBAG2001).",
    "",
    '<picture>',
    '  <source media="(prefers-color-scheme: dark)" srcset="assets/readme/stats-dark.svg">',
    '  <source media="(prefers-color-scheme: light)" srcset="assets/readme/stats-light.svg">',
    '  <img alt="GitHub public metrics" src="assets/readme/stats-dark.svg" width="100%" />',
    "</picture>",
    "",
    `<sub>Last updated: ${updatedAt} (UTC) · YTD counts for commits & PRs · <a href="https://github.com/${USERNAME}/${USERNAME}/actions/workflows/readme-stats.yml">readme-stats workflow</a></sub>`,
    "",
  ].join("\n");
}

function replaceStatsSection(readme, statsBlock) {
  const pattern = new RegExp(
    `${START_MARKER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END_MARKER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  );

  if (!pattern.test(readme)) {
    throw new Error(`README markers ${START_MARKER} / ${END_MARKER} not found.`);
  }

  return readme.replace(pattern, `${START_MARKER}\n${statsBlock}\n${END_MARKER}`);
}

async function main() {
  const repos = await githubApi(`/users/${USERNAME}/repos?per_page=100&type=public&sort=updated`);
  const publicRepos = repos.length;
  const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);

  const commitsSearch = await githubApi(
    `/search/commits?q=${encodeURIComponent(`author:${USERNAME} committer-date:${YEAR}-01-01..${YEAR}-12-31`)}&per_page=1`,
  );
  const pullRequestsSearch = await githubApi(
    `/search/issues?q=${encodeURIComponent(`author:${USERNAME} type:pr created:${YEAR}-01-01..${YEAR}-12-31`)}&per_page=1`,
  );

  const payload = {
    publicRepos,
    commitsYtd: commitsSearch.total_count ?? 0,
    pullRequestsYtd: pullRequestsSearch.total_count ?? 0,
    stars,
  };

  fs.writeFileSync(STATS_DARK, `${buildStatsSvg(payload, "dark")}\n`);
  fs.writeFileSync(STATS_LIGHT, `${buildStatsSvg(payload, "light")}\n`);

  const updatedAt = new Date().toISOString().slice(0, 10);
  const statsBlock = formatStatsBlock(updatedAt);

  const readme = fs.readFileSync(README_PATH, "utf8");
  fs.writeFileSync(README_PATH, replaceStatsSection(readme, statsBlock));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});