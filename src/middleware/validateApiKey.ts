import type {Request, Response, NextFunction} from 'express';

const apiKey = process.env.API_KEY || 'your-api-key';

const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKeyHeader = req.header('x-api-key');
    if (apiKeyHeader && apiKeyHeader === apiKey) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
};

export default validateApiKey;
