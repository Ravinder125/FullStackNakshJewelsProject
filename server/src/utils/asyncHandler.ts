import { NextFunction, Request, Response } from "express";
import { AsyncHandlerType } from "../types/utils.js";



export const asyncHandler =
    (fn: AsyncHandlerType) =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next)
        };
