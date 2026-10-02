<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e293b,50:FC6D26,100:0f172a&height=180&section=header&text=Engineering+%26+DevOps&fontSize=32&fontColor=ffffff&animation=fadeIn&fontAlignY=42&desc=Kevin+Bryan+Austria+Galvan&descAlignY=62&descSize=16&descAlign=50" alt="Engineering and DevOps — Kevin Bryan Austria Galvan" width="100%" />

**How I work · How I ship**

</div>

Full-Stack Developer focused on **delivery**: branch strategy, merge requests, automated pipelines, and production operations. This profile documents **engineering and DevOps practice**—not a duplicate of my [GitHub profile](https://github.com/KevinBAG2001) (what I build) or [portfolio](https://kevinbag2001.github.io) (who I am).

---

### Delivery workflow

```mermaid
gitGraph
  commit id: "feature work"
  branch dev
  checkout dev
  commit id: "integrate"
  branch qa
  checkout qa
  commit id: "validate"
  branch main
  checkout main
  commit id: "production"
```

- **GitFlow-style branches:** `dev` → `qa` → `main` for integration, validation, and production.
- **Merge requests** as the default path to production-quality code (including **250+ MRs** on a long-running public-sector document platform).
- **GitLab CI/CD** pipelines for build, test, and deploy stages across environments.
- **50+ production deployments** through automated pipelines on the `dev` / `qa` / `main` model.

---

### Automation & tooling

**GitLab activity visualization (profile bot)** — scheduled job on **GitLab CI** that keeps the profile contribution graphic fresh:

| Layer | Tools |
| ----- | ----- |
| API & data | **Python** · **python-gitlab** (fetch contribution / activity context) |
| Rendering | **svgwrite** (vector graph) · **Pillow** (image post-processing) |
| Delivery | Pipeline artifact → commit to profile repository |

Purpose: reproducible, maintainable automation instead of manual SVG updates—same mindset applied to application **CI/CD** and operational scripts.

---

### Engineering practices

| Area | Practice |
| ---- | -------- |
| **Testing** | Automated tests in application repos; pipeline gates before promote to `qa` / `main`. |
| **Security** | Role-based access, sensitive-session controls (OTP / single-session patterns in production systems), validated-document immutability, path and origin checks in local tooling (e.g. sandboxed Git clients). |
| **Documentation** | Technical docs, merge request descriptions, and operational runbooks for deployments. |
| **Production** | Environment promotion, rollback awareness, monitoring day-to-day availability of institutional systems. |

---

### Selected engineering work

*Professional systems — anonymized; framed around **pipelines, deployments, and integrations**.*

| System | Engineering highlights | Status |
| ------ | ------------------------ | ------ |
| **Document Management & Operational Tracking System** | **GitLab CI/CD** end-to-end; **Alfresco** + **Nextcloud** integrations; merge-request-driven evolution; PDF/Excel report jobs; production promotion via `dev` / `qa` / `main`. | `PRODUCTION` |
| **Personnel Operations Platform** | Greenfield **Laravel** platform; PostgreSQL migrations and reporting; iterative releases to operational users. | `PRODUCTION` / `IN DEVELOPMENT` |
| **Digital Property-Tax Collection System** | Municipal deployment on **.NET** / **C#** / **PHP** / **SQL Server** stack; barcode validation flows for external payment channel integration. | `PRODUCTION` |
| **[Abyssan](https://github.com/KevinBAG2001/Abyssan)** (open source) | **Docker Compose** environments; layered API; WebSocket notifications; security-focused Git operations. | `OPEN SOURCE` |

---

### Core delivery stack

**DevOps:** Git · GitLab · GitLab CI/CD · Docker · GitHub (mirror / OSS)  
**Backend / data:** Laravel · PHP · .NET · C# · PostgreSQL · SQL Server  
**Automation:** Python (GitLab API, SVG/image generation, operational scripts)

---

<div align="center">

[![GitHub — What I build](https://img.shields.io/badge/GitHub-What_I_build-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KevinBAG2001)
[![Portfolio](https://img.shields.io/badge/Portfolio-kevinbag2001.github.io-0d9488?style=for-the-badge&logo=googlechrome&logoColor=white)](https://kevinbag2001.github.io)
[![Email](https://img.shields.io/badge/Email-kevinbryan__austria@outlook.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kevinbryan_austria@outlook.com)

</div>
