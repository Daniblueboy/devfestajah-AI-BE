import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { aiService } from '../services/ai.service';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

export const chatController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = chatSchema.parse(req.body);
    const result = await aiService.generateChatReply(message);
    res.json({
      ...result,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
