import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: IUserPayload;
            file?: Express.Multer.File;
        }
    }
}
