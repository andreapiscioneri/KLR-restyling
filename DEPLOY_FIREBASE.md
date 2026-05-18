Firebase env vars and local testing

Required environment variables (server-side):

- FIREBASE_SERVICE_ACCOUNT: the JSON service account credentials (stringified JSON).
- FIREBASE_STORAGE_BUCKET: the Google Storage bucket name (e.g. "my-project.appspot.com").

Set locally (macOS / Linux):

1. Place your service account JSON somewhere safe, e.g. `service-account.json`.
2. In your shell, export the vars:

```bash
export FIREBASE_SERVICE_ACCOUNT="$(cat service-account.json)"
export FIREBASE_STORAGE_BUCKET="your-bucket-name"
```

Run the dev server:

```bash
pnpm dev
# or
npm run dev
```

Testing uploads locally:

- Open the Admin UI at `http://localhost:3000/admin` (authenticate if needed) and use the image upload buttons in the Pages/Brands/Team editors.
- If Firebase env vars are missing, the server upload route returns a JSON error explaining which variable is missing. The Admin UI shows that error below the Image field.

Notes for Netlify deployment:

- In Netlify's Site settings → Build & deploy → Environment, add the two variables:
  - `FIREBASE_SERVICE_ACCOUNT` — copy the entire JSON (string) into the value (no extra newlines added).
  - `FIREBASE_STORAGE_BUCKET` — your bucket name.
- Redeploy the site after setting env vars.

If you prefer using Netlify CLI for deploy previews, set the same env vars in your shell before running `netlify deploy --build`.
