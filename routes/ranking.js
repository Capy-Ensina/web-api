import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rota POST para criar um novo ranking
router.post('/', async (req, res) => {
    try {
        const { minigame, pontos, tempo, usuario } = req.body;

        const novoRanking = await prisma.ranking.create({
            data: {
                minigame,
                pontos,
                tempo,
                usuario,
            },
        });

        res.status(200).json(novoRanking);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para buscar todos os rankings
router.get('/', async (req, res) => {
    try {
        const rankings = await prisma.ranking.findMany();
        res.status(200).json(rankings);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para buscar um ranking específico por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const ranking = await prisma.ranking.findUnique({
            where: { id },
        });

        res.status(200).json(ranking);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota PUT para atualizar os dados de um ranking
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { minigame, pontos, tempo, usuario } = req.body;

        const rankingAtualizado = await prisma.ranking.update({
            where: { id },
            data: {
                minigame,
                pontos,
                tempo,
                usuario,
            },
        });

        res.status(200).json(rankingAtualizado);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.ranking.delete({
            where: { id },
        });

        res.status(200).send();
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

export default router;
