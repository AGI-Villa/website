# AGI Villa Website

> **Community-Driven, AI-Native Venture Studio**

Official website for AGI Villa - empowering founders to achieve success through community.

## 📚 Documentation

- [Development Plan](./docs/DEVELOPMENT_PLAN.md) - Frontend-first development roadmap ⭐
- [Technical Architecture](./docs/tech-architecture.md) - Complete tech stack and system design
- [Design Specifications](./docs/design-spec.md) - UI/UX design guidelines
- [Landing Page Content](./docs/landing-page.md) - Website copy and content structure

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- PostgreSQL 14+ *(for future Strapi CMS)*

### Installation

```bash
# Clone repository
git clone https://github.com/agivilla/website.git
cd website

# Install dependencies
pnpm install

# Setup environment variables
cp frontend/.env.example frontend/.env.local

# Start development server
pnpm dev
```

This will start:
- Frontend: http://localhost:3000

> **Note**: Strapi CMS backend is planned for future implementation

## 📁 Project Structure

```
website/
├── docs/               # Documentation
├── frontend/           # Next.js application
├── strapi/            # Strapi CMS (TODO: To be implemented)
└── README.md          # This file
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animation:** Framer Motion
- **Data Fetching:** React Query

### Backend *(Planned)*
- **CMS:** Strapi v4 *(TODO: To be implemented)*
- **Database:** PostgreSQL *(TODO: To be implemented)*
- **File Storage:** Cloudinary *(TODO: To be implemented)*

### Infrastructure
- **Hosting:** Vercel (Frontend) + Railway (Backend)
- **CI/CD:** GitHub Actions
- **Monitoring:** Vercel Analytics + Sentry

## 🧑‍💻 Development

### Available Commands

```bash
# Development
pnpm dev              # Start development server
pnpm dev:frontend     # Start frontend only

# Building
pnpm build            # Build for production
pnpm build:frontend   # Build frontend only

# Linting & Formatting
pnpm lint             # Lint code
pnpm format           # Format all code

# Testing
pnpm test             # Run tests
pnpm test:frontend    # Run frontend tests
```

> **Note**: Strapi CMS commands will be available after backend implementation

### Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "feat: add awesome feature"`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

**Commit Convention:** We follow [Conventional Commits](https://www.conventionalcommits.org/)
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 🌍 Deployment

### Environments

| Environment | URL | Branch | Auto-Deploy |
|-------------|-----|--------|-------------|
| Production | https://agivilla.org | `main` | ✅ |
| Staging | https://staging.agivilla.org | `develop` | ✅ |
| Preview | Vercel preview URLs | PRs | ✅ |

### Deployment Process

1. **Frontend (Vercel):**
   - Connected to GitHub
   - Auto-deploys on push to `main`
   - Preview deployments for all PRs

2. **Backend (Railway):** *(TODO: To be implemented)*
   - Will be connected to GitHub
   - Auto-deploy on push to `main`
   - Managed PostgreSQL database

## 📊 Performance

We aim for excellent Core Web Vitals:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

## 🔒 Security

- HTTPS enforced
- Environment variables for sensitive data
- CORS configured properly
- Regular dependency updates
- Content Security Policy implemented

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## 📝 License

This project is proprietary and confidential.

© 2025 AGI Villa. All Rights Reserved.

## 📞 Contact

- **Website:** https://agivilla.org
- **Email:** hello@agivilla.org
- **Location:** Shanghai, China

---

**Built with ❤️ by the AGI Villa team**
