<div align="center">

<img src="https://capsule-render.vercel.app/api?type=soft&color=020617&height=200&text=Kevin%20Bryan%20Austria%20Galvan&fontSize=34&fontColor=ffffff&fontAlignY=38&desc=How%20I%20work%20%C2%B7%20How%20I%20ship&descSize=17&descAlignY=58&descAlign=50&descColor=cbd5e1&stroke=FC6D26&strokeWidth=1.2" alt="Kevin Bryan Austria Galvan — Engineering and DevOps" width="100%" />

**Engineering and DevOps hub** — delivery, pipelines, automation

<br />

[![GitHub](https://img.shields.io/badge/GitHub-What_I_build-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/KevinBAG2001)
[![Portfolio](https://img.shields.io/badge/Portfolio-kevinbag2001.github.io-0d9488?style=flat-square&logo=googlechrome&logoColor=white)](https://kevinbag2001.github.io)
[![Email](https://img.shields.io/badge/Email-kevinbryan__austria@outlook.com-64748b?style=flat-square&logo=gmail&logoColor=white)](mailto:kevinbryan_austria@outlook.com)

</div>

Full-Stack Developer focused on **how software reaches production**: branch strategy, merge requests, **GitLab CI/CD**, and operational discipline. Complements my [GitHub profile](https://github.com/KevinBAG2001) (what I build) and [portfolio](https://kevinbag2001.github.io).

---

<div align="center">

### Impact

<table>
<tr>
<td align="center" width="25%"><br /><strong style="font-size:2em">50+</strong><br /><sub>production deploys</sub><br /><br /></td>
<td align="center" width="25%"><br /><strong style="font-size:2em">250+</strong><br /><sub>merge requests</sub><br /><br /></td>
<td align="center" width="25%"><br /><strong style="font-size:2em">dev → qa → main</strong><br /><sub>promotion model</sub><br /><br /></td>
<td align="center" width="25%"><br /><strong style="font-size:2em">CI/CD</strong><br /><sub>automated pipelines</sub><br /><br /></td>
</tr>
</table>

</div>

---

### Delivery workflow

```mermaid
gitGraph
  commit id: "feature"
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

- **GitFlow-style branches:** `dev` → `qa` → `main`
- **Merge requests** as the default quality gate (**250+ MRs** on a long-running document platform)
- **GitLab CI/CD** for build, test, and deploy across environments
- **50+ production deployments** on the `dev` / `qa` / `main` model

---

### Automation and tooling

**GitLab activity visualization (profile bot)** — scheduled **GitLab CI** job:

| Layer | Tools |
| ----- | ----- |
| API | **Python** · **python-gitlab** |
| Render | **svgwrite** · **Pillow** |
| Ship | Pipeline artifact → profile repository commit |

Reproducible automation—the same mindset as application **CI/CD** and runbooks.

---

### Engineering practices

| Area | Practice |
| ---- | -------- |
| **Testing** | Pipeline gates before `qa` / `main` promotion |
| **Security** | RBAC, OTP / single-session patterns, validated-document immutability |
| **Documentation** | MR descriptions, technical docs, deployment notes |
| **Production** | Environment promotion, availability of institutional systems |

---

### Selected engineering work

| System | Delivery focus | Status |
| ------ | -------------- | ------ |
| **Document Management & Operational Tracking System** | **GitLab CI/CD** · **Alfresco** / **Nextcloud** · MR-driven releases · PDF/Excel jobs | `PRODUCTION` |
| **Personnel Operations Platform** | Greenfield **Laravel** · PostgreSQL · iterative production releases | `PRODUCTION` / `IN DEVELOPMENT` |
| **Digital Property-Tax Collection System** | **.NET** / **C#** / **PHP** / **SQL Server** · barcode flows · **external payment channel** | `PRODUCTION` |
| **[Abyssan](https://github.com/KevinBAG2001/Abyssan)** | **Docker Compose** · layered API · WebSocket · sandboxed Git ops | `OPEN SOURCE` |

---

<div align="center">

<img src="https://skillicons.dev/icons?i=gitlab,docker,git,python,postgres,laravel&theme=dark&perline=8" height="52" alt="Delivery stack icons" />

<br /><br />

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FC6D26,100:020617&height=80&section=footer&text=GitLab%20CI%2FCD%20%C2%B7%20Ship%20with%20confidence&fontSize=15&fontColor=e2e8f0&animation=twinkling" alt="" width="100%" />

</div>
