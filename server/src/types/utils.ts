import { Request, Response, NextFunction } from 'express';

export type AsyncHandlerType = (
    req: Request,
    res: Response,
    next?: NextFunction,
) => Promise<any>


export interface ApiResponseType<T> {
    success: boolean;
    message: string;
    data?: T;
}

export interface ApiErrorType {
    statusCode: number;
    message: string;
    errors?: unknown;
}
