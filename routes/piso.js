import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rota POST para criar um novo piso
router.post('/', async (req, res) => {
    try {
        const { descricao, imagem } = req.body;

        const novoPiso = await prisma.piso.create({
            data: {
                descricao,
                imagem,
            },
        });

        res.status(200).json(novoPiso);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para buscar todos os pisos
router.get('/', async (req, res) => {
    try {
        const pisos = await prisma.piso.findMany();
        res.status(200).json(pisos);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const piso = await prisma.piso.findUnique({
            where: { id },
        });

        res.status(200).json(piso);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota PUT para atualizar os dados de um piso
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, imagem } = req.body;

        const pisoAtualizado = await prisma.piso.update({
            where: { id },
            data: {
                descricao,
                imagem,
            },
        });

        res.status(200).json(pisoAtualizado);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota DELETE
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.piso.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

export default router;
