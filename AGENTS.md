# AI Coding Agent Guidelines for TUB Delhi

## Project overview
- Small Express.js backend in `server.js` serving built assets from `dist/`.
- Single-page frontend using React and Vite.
- Build pipeline generates production assets from the root `index.html` and `main.jsx`.
- Uploaded/static assets live in `public/uploads/`.

## Run / development commands
- `npm install` — install dependencies.
- `npm run build` — build frontend assets into the `dist` directory using Vite.
- `npm start` — automatically runs build and starts the production server.
- `npm run dev` — start server with Node inspector (`node --inspect server.js`).

## Key files
- `server.js` — Express app, serving `dist/` for frontend and `public/uploads/` for images.
- `package.json` — project metadata, CommonJS context, dependencies: `express`, `multer`, `sharp`.
- `public/index.html` — frontend entrypoint; contains inline React components, data, and UI logic.
- `public/uploads/` — image upload and static asset directory.

## Important conventions
- Keep backend code in CommonJS format; do not migrate to ES modules unless the user requests it and adjusts `package.json`.
- The frontend is a React application managed by Vite. **Ignore `public/index.html`**; all UI changes must be made in `main.jsx` or the root `index.html`.
- Static assets like the logo, favicon, and menu images must be placed in the `public/` directory so Vite can copy them to `dist/` during the build.
- `public/uploads/` is created at runtime by `server.js` and is the intended location for upload assets.
- `server.js` uses `express.static()` with `maxAge: '1d'`, so refresh static assets carefully during local testing.

## What agents should do first
- Inspect `server.js` and `public/index.html` when modifying features or UI.
- Use the existing `npm` scripts for local testing.
- Preserve the current architecture if the user asks for small fixes, enhancements, or bug fixes.

## Notes for code changes
- Fixes to API behavior should be made in `server.js` and tested via the served app or API endpoints like `/api/hello` and `/api/health`.
- Frontend changes in `public/index.html` should keep the inline React/Babel setup consistent unless the task explicitly asks for a build system or refactor.
- There is no test suite or additional docs in this repository.

## Suggested next customization
- If the repository grows, add a dedicated skill for frontend UI updates or a prompt file for refactoring inline React into a maintainable structure.
