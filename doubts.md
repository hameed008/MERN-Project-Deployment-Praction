**Q1:** this is my `package.json`:

```js
{
  "name": "guide-to-deploy-node-jsexpress-backend-to-render",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "NODE_ENV=production node backend/server.js",
    "dev": "set NODE_ENV=development && nodemon backend/server.js",
    "test": "NODE_ENV=test jest",
    "client": "cd frontend && npm start",
    "build": "cd frontend && npm run build"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "mongoose": "^8.13.2"
  }
}
```

this is my `.env.development`:

```js
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb+srv://khans:B0neLZcuxfY5aO7a@khans.20n34cb.mongodb.net/deploymentTestDB
```

`this is my server.js`:

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

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 8000, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
```

and this is my `folder structure`:

```
project-root/
├── .env.development ✅
├── backend/
│   └── server.js ✅ (uses dotenv)
├── package.json ✅

```

and i am getting the `MONGO_URI` as undefined [Ans-1]()

**Q2:** why the `package.json` is outside the `frontend` and `backend` here:

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

[Ans-2]()
