import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        //Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if(!user){
            throw new Error("User/Password incorrect");
        }

        //Preciso verificar se a senha está correta
        const passwordMatch = await compare(password, user.password); //Aqui estamos comparando se a senha criptografa é a mesma que o usuário digitou. Se sim irá devolver para a const true or false

        if(!passwordMatch){
            throw new Error("User/Password incorrect");
        }

        //Logar o usuário de fato, para isso precisamos gerar um token JWT e devolver os dados do usuario, como id, name, email
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "30d", //Quando o token irá expirar
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        };
    }
}

export {AuthUserService};