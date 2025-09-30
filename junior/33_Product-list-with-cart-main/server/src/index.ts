import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes'; // Importer les routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Utiliser les routes avec le préfixe /api
app.use('/api', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
