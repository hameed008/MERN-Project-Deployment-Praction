The issue is that your `MONGO_URI` is coming up as undefined because of how the environment variables are being loaded. Here's what's happening and how to fix it:

## The Problem

1. In your `package.json`, you're setting `NODE_ENV=development` in the `dev` script, but the way you're doing it differs between operating systems (Windows vs Unix-like systems).
2. The `.env.development` file is in your project root, but your server is in the `backend` folder, so the path resolution might be off.

## Solutions

### Option 1: Fix the dev script (cross-platform)

Change your scripts to use `cross-env` for cross-platform compatibility:

1. First install cross-env:

```bash
npm install cross-env --save-dev
```

2. Update your package.json scripts:

```json
"scripts": {
  "start": "NODE_ENV=production node backend/server.js",
  "dev": "cross-env NODE_ENV=development nodemon backend/server.js",
  "test": "NODE_ENV=test jest",
  "client": "cd frontend && npm start",
  "build": "cd frontend && npm run build"
}
```

### Option 2: Fix the .env file path

Modify your server.js to explicitly point to the correct .env file path:

```javascript
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env.development"),
});
```

### Option 3: Move .env file

Move your `.env.development` file into the `backend` folder and rename it to just `.env`, then simplify your dotenv config:

```javascript
dotenv.config(); // will automatically load .env file in same directory
```

### Additional Checks:

1. Make sure there are no spaces in your `.env.development` file around the `=` signs or after the MongoDB URI.
2. Verify your MongoDB URI is correct (I notice there's a space before the comma in your example - this would cause problems).
3. Add error handling for the MongoDB connection:

```javascript
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
```

Try these solutions one at a time to see which one resolves your issue. The most likely fix is using `cross-env` to properly set the environment variable across different operating systems.
