import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ 
//   path: path.resolve(__dirname, '../.env.development') 
// });

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.send('Backend is working!');
});

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 8000, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
