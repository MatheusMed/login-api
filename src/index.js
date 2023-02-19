"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_conect_1 = __importDefault(require("./prisma-conect"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const PORT = process.env.PORT;
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_conect_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao criar usuario" });
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma_conect_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Erro, senha errada tente novamente" });
    }
    return res.status(200).json({ message: "Login com sucesso" });
}));
app.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, content, color, completed, email } = req.body;
    try {
        const result = yield prisma_conect_1.default.todos.create({
            data: {
                titulo, content, color, completed,
                author: { connect: { email } },
            },
        });
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({ message: " Erro ao criar sua nota" });
    }
}));
app.get('/feedTodos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield prisma_conect_1.default.user.findUnique({
            where: { email }
        });
        if (email == user.email) {
            try {
                const posts = yield prisma_conect_1.default.todos.findMany({
                    include: { author: false }
                });
                return res.status(200).json(posts);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao fazer a lista da sua listinha" });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Email nao existente` });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
