import express from 'express';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();
const router = express.Router();
const horarioBrasilia = () => DateTime.now().setZone('America/Sao_Paulo').toJSDate();

// Rota POST para criar um novo minigame
router.post('/', async (req, res) => {
    try {
        const { descricao, nome } = req.body;

        const novoMinigame = await prisma.minigames.create({
            data: {
                descricao,
                nome,
                data_criacao: horarioBrasilia(),
                data_ultimo_update: horarioBrasilia(),
            },
        });

        res.status(200).json(novoMinigame);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para buscar todos os minigames
router.get('/', async (req, res) => {
    try {
        const minigames = await prisma.minigames.findMany();
        res.status(200).json(minigames);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para buscar um minigame específico por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const minigame = await prisma.minigames.findUnique({
            where: { id },
        });

        res.status(200).json(minigame);
    } catch {
        console.error('Erro no servidor', err)
        res.status(500).json({message: 'Erro no servidor, tente novamente'})
    }
})

// Rota PUT para atualizar
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, nome } = req.body;

        const minigameAtualizado = await prisma.minigames.update({
            where: { id },
            data: {
                descricao,
                nome,
                data_ultimo_update: horarioBrasilia(),
            },
        });

        res.status(200).json(minigameAtualizado);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.minigames.delete({
            where: { id },
        });

        res.status(204).send(); // Sem conteúdo, indicando sucesso
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

export default router;

