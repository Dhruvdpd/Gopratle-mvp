import express from 'express';
import {
  createRequirement,
  getRequirements,
  getRequirementById,
} from '../controllers/requirementController.js';

const router = express.Router();

router.post('/', createRequirement);
router.get('/', getRequirements);
router.get('/:id', getRequirementById);

export default router;