"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //Receber o token
    const authToken = req.headers.authorization; //O token SEMPRE estará nesse caminho
    //verificar se recebemos mesmo o token
    if (!authToken) {
        return res.status(401).end(); //Aqui estamos barrando o usuário logo de cara caso nao tenha token
    }
    //console.log(authToken);
    //Coletando o token
    const [, token] = authToken.split(" "); //Como vimos através do console.log, sempre recebemos uma palavra ("Bearer", que é como chamamos o prefix) e depois " " (espaço) e entao o token. Nesse codigo estamos dizendo que estamos separando o authtoken a cada " " (espaço) e [, token] aqui estamos dizendo que estamos ignorando o primeiro objeto, pegando o segundo e chamado de token.
    //validando o token
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user_id = sub; //aqui criei uma variavel no req e atrelei ela ao id do usuario, no caso o sub
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
