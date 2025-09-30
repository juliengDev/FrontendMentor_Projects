import { Router } from 'express';
import { getRecipes } from '../controllers/recipeController';

const router = Router();

router.get('/recipes', getRecipes);

export default router;
