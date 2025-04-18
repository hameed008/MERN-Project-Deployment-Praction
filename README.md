Here’s a ready-to-use **GitHub template** setup for a MERN stack project with **development**, **production**, and **testing** environments + **Render (backend)** + **Vercel (frontend)** deployment.

---

## ✅ GitHub Repo Structure

```
mern-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── .env.development
├── .env.production
├── .env.test
├── package.json
├── README.md
```

---

## ✅ Backend (Node + Express)

**Install dependencies:**

```bash
cd backend
npm init -y
npm install express mongoose dotenv cors
npm install --save-dev nodemon
```

**server.js:**

```js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send("Backend is working!");
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
```

---

## ✅ Frontend (React)

**Install:**

```bash
npx create-react-app frontend
cd frontend
npm install axios
```

**React Example (App.js):**

```js
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/test`)
      .then((res) => setMessage(res.data));
  }, []);

  return <h1>{message}</h1>;
}

export default App;
```

**`.env.development` (frontend):**

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ✅ Deploy Backend to Render

1. Push code to GitHub.
2. Go to [render.com](https://render.com), create new **Web Service**.

#### ✅ **Field Values for Backend (Render Setup)**

- **Name**:  
  `mern-backend` _(or whatever you prefer)_

- **Project**:  
  Optional – select a project or leave it blank.

- **Environment**:  
  `Node`

- **Branch**:  
  `main` _(or your branch name)_

- **Region**:  
  `Oregon` _(or closest region to you)_

- **Root Directory**:  
  `backend` ✅ _(because your backend lives inside the `backend/` folder)_

- **Build Command**:

  ```bash
  npm install
  ```

- **Start Command**:
  ```bash
  node server.js
  ```

---

### ✅ Also:

- Make sure `.env.production` file values are added in Render manually under:
  **Render → Dashboard → Environment → Add Environment Variables**

Example:

```
NODE_ENV = production
PORT = 10000
MONGO_URI = your_mongodb_uri
```

---

## ✅ Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and connect your GitHub repo.
2. Set the project root as `frontend/`
3. Set environment variables:

```
REACT_APP_API_URL = https://your-render-url/api
```

4. Done! Vercel handles everything.
