import crypto from "crypto";
import multer from "multer";

import { extname, resolve } from "path";

export default{
    upload(folder: string){ //folder é o nome da pasta na qual a pessoa deseja salvas as imagens e a pessoa é quem irá me fornecer
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder), //__dirname é o diretorio no qual estamos, no caso desse arquivo aqui é o config
                //".." é para voltar uma pasta
                filename: (request, file, callback) => {
                    //para nao ter conflito de nome nas fotos
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                }
            })
        }
    }
}