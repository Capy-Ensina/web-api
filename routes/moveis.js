import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rota POST para criar um novo móvel
router.post('/', async (req, res) => {
    try {
        const { descricao, imagem } = req.body;

        const novoMovel = await prisma.moveis.create({
            data: {
                descricao,
                imagem,
            },
        });

        res.status(200).json(novoMovel);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para buscar todos os móveis
router.get('/', async (req, res) => {
    try {
        const moveis = await prisma.moveis.findMany();
        res.status(200).json(moveis);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const movel = await prisma.moveis.findUnique({
            where: { id },
        });

        res.status(200).json(movel);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota PUT para atualizar os dados de um móvel
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, imagem } = req.body;

        const movelAtualizado = await prisma.moveis.update({
            where: { id },
            data: {
                descricao,
                imagem,
            },
        });

        res.status(200).json(movelAtualizado);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota DELETE para remover um móvel
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.moveis.delete({
            where: { id },
        });

        res.status(200).send(); // Sem conteúdo, indicando sucesso
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

export default router;
