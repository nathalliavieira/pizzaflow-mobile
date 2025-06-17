import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    //Receber o token
    const authToken = req.headers.authorization; //O token SEMPRE estará nesse caminho

    //verificar se recebemos mesmo o token
    if(!authToken){
        return res.status(401).end(); //Aqui estamos barrando o usuário logo de cara caso nao tenha token
    }
    //console.log(authToken);
    
    //Coletando o token
    const [, token] = authToken.split(" ") //Como vimos através do console.log, sempre recebemos uma palavra ("Bearer", que é como chamamos o prefix) e depois " " (espaço) e entao o token. Nesse codigo estamos dizendo que estamos separando o authtoken a cada " " (espaço) e [, token] aqui estamos dizendo que estamos ignorando o primeiro objeto, pegando o segundo e chamado de token.

    //validando o token
    try{
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        req.user_id = sub; //aqui criei uma variavel no req e atrelei ela ao id do usuario, no caso o sub

        return next();
    }catch(err){
        return res.status(401).end();
    }
}