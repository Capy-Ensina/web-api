import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rota POST
router.post('/', async (req, res) => {
    try {
        const { descricao, imagem, nome, preco } = req.body;

        const novaLoja = await prisma.loja.create({
            data: {
                descricao,
                imagem,
                nome,
                preco,
            },
        });

        res.status(200).json(novaLoja);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET
router.get('/', async (req, res) => {
    try {
        const lojas = await prisma.loja.findMany();
        res.status(200).json(lojas);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const loja = await prisma.loja.findUnique({
            where: { id },
        });

        res.status(200).json(loja);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota PUT para atualizar
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, imagem, nome, preco } = req.body;

        const lojaAtualizada = await prisma.loja.update({
            where: { id },
            data: {
                descricao,
                imagem,
                nome,
                preco,
            },
        });

        res.status(200).json(lojaAtualizada);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.loja.delete({
            where: { id },
        });

        res.status(200).send();
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

export default router;
