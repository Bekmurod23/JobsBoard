import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import TokenPayload from '../interfaces/tokenPayload.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { UsersService } from '../users/users.service';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const usersService = new UsersService;
    const cookies = req.cookies;
    if (cookies && cookies.Authentication) {
        const secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
        try {
            const verificationResponse = jwt.verify(cookies.Authentication, secret) as TokenPayload;
            const id = verificationResponse.userId;
            const user = await usersService.getUserById(id);
            if (user) {
                (req as RequestWithUser).user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default authMiddleware;