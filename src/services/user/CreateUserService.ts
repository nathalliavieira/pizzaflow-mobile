//O service serve para criar a funcionalidade de algo, exemplo, a funcionalidade de registrar o usuario.

import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        //Primeiramente preciso verificar se enviou um email
        if(!email){
            throw new Error("Email incorrect");
        }

        //Segunda verificacao é verificar se o email ja esta cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        }) //Aqui fiz o seguinte: Criei uma const aonde ela irá buscar através do método findFirst se o email no qual estou cadastrando já existe na plataforma. Se existir, irá armazenar o email nessa constante.

        if(userAlreadyExists){
            throw new Error("User already exists.");
        }

        //*Antes de cadastrar precisamos criptografar a senha que o usuario irá digitar:
        const passwordHash = await hash(password, 8) //O número 8 é o salto da criptografia

        //Terceiro: Cadastrar o usuario no banco
        const user = await prismaClient.user.create({
            data:{ //Em data colocamos as informacoes que queremos cadastrar
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{ //Em select colocamos as informacoes que queremos devolver em tela
                id: true,
                name: true,
                email: true,
            }
        })

        return(user);
    }
}

export {CreateUserService};