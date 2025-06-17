"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors"); //Essa biblioteca deve ser SEMPRE importante na segunda linha do código
const cors_1 = __importDefault(require("cors")); //O cors possibilita que qualquer ip rode algo
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } //Quero apenas imagens de no máximo 50mb
}));
app.use(routes_1.router);
app.use("/files", express_1.default.static(path_1.default.resolve(__dirname, "..", "tmp")));
app.use((err, req, res, next) => {
    if (err instanceof Error) { //Aqui estamos verificando se o que está passando dentro da rota é realmente do tipo Error
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error."
    });
});
app.listen(process.env.PORT, () => console.log("Servidor online!"));
