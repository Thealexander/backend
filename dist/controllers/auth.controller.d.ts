import { Request, Response } from "express";
export declare const signup: (req: Request, res: Response) => Promise<void>;
export declare const signin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const profile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logout: (req: Request, res: Response) => void;
