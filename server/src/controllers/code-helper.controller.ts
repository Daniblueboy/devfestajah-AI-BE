import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { aiService } from '../services/ai.service';

const codeHelperSchema = z.object({
  code: z.string().min(1, 'Code cannot be empty'),
  context: z.string().optional(),
});

export const codeHelperController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, context } = codeHelperSchema.parse(req.body);
    const result = await aiService.suggestCodeImprovements(code, context);
    res.json({
      ...result,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
