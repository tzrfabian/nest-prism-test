
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    });

    // By calling res.setHeader, you instruct the Express response object to include this header in the outgoing HTTP response.
    res.setHeader('X-Custom-Header', 'NestLogger'); // custom HTTP header named X-Custom-Header with the value NestLogger to every response sent by the server.

    console.log('User-Agent:', req.headers['user-agent']);
    next();
  }
}
