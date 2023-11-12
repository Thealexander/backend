import { Request, Response } from "express";
export declare const readAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const readUser: (req: Request, res: Response) => Promise<void>;
export declare const createUser: (req: Request, res: Response) => Promise<void>;
export declare const updateUser: (req: Request, res: Response) => Promise<void>;
export declare const deleteUser: (req: Request, res: Response) => Promise<void>;
