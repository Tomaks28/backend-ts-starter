import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: { message: "zod error", zodError: err.flatten() },
    });
  }

  if (err instanceof Error) {
    const error = err as Error & { statusCode?: number };
    return res.status(error.statusCode ?? 400).json({
      error: { message: err.message },
    });
  }

  res.send({ error: { message: "Internal Server Error" } });
};
