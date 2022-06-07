import { Injectable, NestMiddleware } from "@nestjs/common";
import e, { NextFunction, Request, Response } from "express";

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log("I am inside validateCustomerMiddleware!")
        // check for authorization
        const {authorization} = req.headers
        if (!authorization) {
            return res.status(403).send({error: "No Authentication Token provided"})
        }

        if (authorization === '123') {
            next()
        } else {
            return res.status(403).send({error: "Invalid Auth Token!"})
        }

        
    }
}