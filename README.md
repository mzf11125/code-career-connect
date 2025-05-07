# Welcome to your Lovable Project

## Project Info

**URL**: [https://lovable.dev/projects/83fd5bd5-4cb0-4501-a2a5-a8e89b17212e](https://lovable.dev/projects/83fd5bd5-4cb0-4501-a2a5-a8e89b17212e)

This repository is the Lovable-generated starter for your front-end application, created with Lovable.dev, an AI-powered app builder that streamlines the scaffolding process. ([lovable.dev](https://lovable.dev/?utm_source=chatgpt.com))

## Technologies Used

* **Vite** for blazing-fast dev and build tooling ([vite.dev](https://vite.dev/?utm_source=chatgpt.com))
* **React** for component-driven UI development ([react.dev](https://react.dev/?utm_source=chatgpt.com))
* **TypeScript** for static typing and scalable codebases ([typescriptlang.org](https://www.typescriptlang.org/?utm_source=chatgpt.com))
* **shadcn-ui** (Radix-based) for accessible, customizable components ([ui.shadcn.com](https://ui.shadcn.com/?utm_source=chatgpt.com))
* **Tailwind CSS** for utility-first styling ([tailwindcss.com](https://tailwindcss.com/?utm_source=chatgpt.com))

## Getting Started

### Prerequisites

* **Node.js** (v14+ recommended) and **npm** installed ([nodejs.org](https://nodejs.org/en?utm_source=chatgpt.com))
* (Optional) **nvm** for managing Node.js versions: install via the NVM script from the official repo ([github.com](https://github.com/nvm-sh/nvm?utm_source=chatgpt.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/mzf11125/code-career-connect
cd code-career-connect

# Install dependencies
npm install

# Start dev server (hot-reload)
npm run dev
```

## Editing Your Code

You have multiple options:

1. **Use Lovable**

   * Visit the [Lovable Project](https://lovable.dev/projects/83fd5bd5-4cb0-4501-a2a5-a8e89b17212e) and prompt changes directly. Commit history syncs automatically.
2. **Local IDE**

   * Edit in your favorite editor. Any pushes to GitHub will reflect back in Lovable.
3. **GitHub Web UI**

   * Click the pencil icon on any file in GitHub to make quick edits and commit.
4. **GitHub Codespaces**

   * Spin up a full dev environment in the cloud. Learn more in [GitHub Codespaces docs](https://docs.github.com/en/codespaces) ([docs.github.com](https://docs.github.com/en/codespaces?utm_source=chatgpt.com))
5. **GitHub Codespaces**

   * Start a new Codespace via the green "Code" button in your repo. Develop in-browser or via VS Code.

## Folder Structure

```plaintext
├── public/             # Static assets & HTML template
│   └── index.html      # App shell and mount point
├── src/                # Application source code
│   ├── components/     # UI components (shadcn-ui)
│   ├── pages/          # Route-based pages (if used)
│   ├── hooks/          # Custom React hooks
│   └── styles/         # Tailwind CSS entrypoints
├── components.json     # shadcn-ui component definitions
├── package.json        # Project metadata & scripts
├── tsconfig.json       # TypeScript compiler settings
├── tailwind.config.ts  # Tailwind configuration
└── vite.config.ts      # Vite build & dev config
```

## Architecture Overview

This is a modern React SPA scaffold:

* **Dev Mode**: `npm run dev` launches Vite’s native ESM server with fast HMR.
* **Prod Build**: `npm run build` triggers Rollup-powered bundling, code splitting, and tree-shaking.
* **CSS Pipeline**: Tailwind JIT + PostCSS autoprefixer streamlines styling.
* **Component System**: Atomic → Molecular → Organism via shadcn-ui and Radix primitives.

## Tooling & Best Practices

* **Linting**: ESLint + Prettier enforce consistent styles.
* **Testing**: Add Vitest or React Testing Library in a `__tests__` folder.
* **CI/CD**: Integrate GitHub Actions for lint/build/test on every push.
* **State Management**: Introduce Context, Zustand, or Redux Toolkit when needed.
* **Routing**: Use React Router or a preferred alternative for multi-page flows.

## Deployment

Deployed in a custom server using digital Ocean, you can acces our deployed app here: https://unemployedcsstudents.com/

## Next Steps

* **API Integration**: Add Axios or fetch wrappers; GraphQL via Apollo Client.
* **Auth**: Plug in OAuth2/JWT or third-party like Auth0/Firebase.
* **i18n**: Introduce `react-i18next` for multi-language support.
* **Performance**: Audit with Lighthouse, lazy-load components.

---

Happy coding!
