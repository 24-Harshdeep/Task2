# ShopHub (scaffold)

This repo is a scaffold for the ShopHub React + Vite application described by the user. It includes:

- `src/api.js` — Axios client + API functions
- `src/queries.js` — React Query hooks (v5) wrapping API calls
- `src/components/Navigation.jsx` — persistent nav
- `src/pages/{Home,ProductDetails,Cart}.jsx` — page stubs implementing core flows
- `src/App.jsx` and `src/main.jsx` — router and app entry

Next steps:

1. From the `Task2` folder, install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

Notes: This scaffold assumes the backend API is available at `https://backendapi-cwp7.onrender.com/api`.
