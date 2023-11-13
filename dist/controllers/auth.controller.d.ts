import { Request, Response } from "express";
interface ExtendedRequest extends Request {
    exp?: number;
}
export declare const signup: (req: Request, res: Response) => Promise<void>;
export declare const signin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const profile: (req: ExtendedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logout: (req: Request, res: Response) => void;
export declare const getMe: (req: ExtendedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateOwnProfile: (req: ExtendedRequest, res: Response) => Promise<void>;
export {};
