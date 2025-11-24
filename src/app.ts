import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import chatRoutes from './routes/chat.routes';
import codeHelperRoutes from './routes/code-helper.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors()); // Configure origin in production
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/code-helper', codeHelperRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error Handling
app.use(errorHandler);

export default app;
