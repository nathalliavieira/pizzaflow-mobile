import express, {Request, Response, NextFunction} from "express";
import "express-async-errors"; //Essa biblioteca deve ser SEMPRE importante na segunda linha do código
import cors from "cors"; //O cors possibilita que qualquer ip rode algo
import path from "path";

import { router } from "./routes";

import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024} //Quero apenas imagens de no máximo 50mb
}))

app.use(router);

app.use(
    "/files", 
    express.static(path.resolve(__dirname, "..", "tmp"))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){ //Aqui estamos verificando se o que está passando dentro da rota é realmente do tipo Error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error."
    })
})

app.listen(process.env.PORT, () => console.log("Servidor online!"))