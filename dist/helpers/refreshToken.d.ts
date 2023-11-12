import { Request, Response } from "express";
import { IPayload } from "../interfaces/payload.interface";
interface ExtendedRequest extends Request {
    userId?: string;
}
declare const refreshAccessToken: (req: ExtendedRequest, res: Response) => Response<any, Record<string, any>>;
declare const generateAccessToken: (payload: IPayload) => {
    accessToken: string;
    refreshToken: string;
};
export { refreshAccessToken, generateAccessToken };
