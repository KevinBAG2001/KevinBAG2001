import fs from "node:fs";
import path from "node:path";

const USERNAME = process.env.GITHUB_USERNAME || process.env.GITHUB_REPOSITORY_OWNER || "KevinBAG2001";
const TOKEN = process.env.GITHUB_TOKEN;
const YEAR = new Date().getUTCFullYear();
const README_PATH = path.join(process.cwd(), "README.md");
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

function formatStats({ publicRepos, commitsYtd, pullRequestsYtd, stars }) {
  const updatedAt = new Date().toISOString().slice(0, 10);

  return [
    "",
    "Public metrics from the GitHub API (public repositories only). GitLab activity lives on [my GitLab profile](https://gitlab.com/KevinBAG2001).",
    "",
    "| Metric | Count |",
    "| --- | ---: |",
    `| Public repositories | **${publicRepos}** |`,
    `| Commits (${YEAR}, author) | **${commitsYtd}** |`,
    `| Pull requests opened (${YEAR}) | **${pullRequestsYtd}** |`,
    `| Stars on public repositories | **${stars}** |`,
    "",
    `<sub>Last updated: ${updatedAt} (UTC) · <a href="https://github.com/${USERNAME}/${USERNAME}/actions/workflows/readme-stats.yml">readme-stats workflow</a></sub>`,
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

  const statsBlock = formatStats({
    publicRepos,
    commitsYtd: commitsSearch.total_count ?? 0,
    pullRequestsYtd: pullRequestsSearch.total_count ?? 0,
    stars,
  });

  const readme = fs.readFileSync(README_PATH, "utf8");
  fs.writeFileSync(README_PATH, replaceStatsSection(readme, statsBlock));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});