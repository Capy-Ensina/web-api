import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rota POST para criar uma nova pontuação
router.post('/', async (req, res) => {
    try {
        const { minigame_id, pontos, repeticao_minigame } = req.body;

        const novaPontuacao = await prisma.jogador_pontuacao.create({
            data: {
                minigame_id,
                pontos,
                repeticao_minigame,
            },
        });

        res.status(200).json(novaPontuacao);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para listar todas pontuações
router.get('/', async (req, res) => {
    try {
        const pontuacoes = await prisma.jogador_pontuacao.findMany();
        res.status(200).json(pontuacoes);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para buscar por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pontuacao = await prisma.jogador_pontuacao.findUnique({
            where: { id },
        });

        res.status(200).json(pontuacao);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota PUT para atualizar uma pontuação
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { minigame_id, pontos, repeticao_minigame } = req.body;

        const pontuacaoAtualizada = await prisma.jogador_pontuacao.update({
            where: { id },
            data: {
                minigame_id,
                pontos,
                repeticao_minigame,
            },
        });

        res.status(200).json(pontuacaoAtualizada);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota DELETE para remover uma pontuação
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.jogador_pontuacao.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

export default router;
