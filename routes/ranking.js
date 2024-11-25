import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rota POST para criar um novo ranking
router.post('/', async (req, res) => {

    try {
        const { minigame, usuario, pontuacao, tempo } = req.body;

        const novoRanking = await prisma.ranking.create({
            data: {
                minigame,
                usuario,
                pontuacao,
                tempo,
            }
        })

        const rankings = await prisma.ranking.findMany({
            orderBy: [
                { pontuacao: 'desc'}, //maior pontuação primeiro
                { tempo: 'asc'}, // menor tempo primeiro
            ]
        })

        // atualiza a posição de cada jogador
        for (let i = 0; i < rankings.length; i++){
            await prisma.ranking.update({
                where: { id: rankings[i].id},
                data: { posicao: i + 1}
            })
        }

        res.status(200).json(novoRanking);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
})

// Rota GET para buscar todos os rankings
router.get('/', async (req, res) => {

    try {
        const rankings = await prisma.ranking.findMany({
            orderBy: [
                { pontuacao: 'desc'}, //maior pontuação primeiro
                { tempo: 'asc'}, // menor tempo primeiro
            ]
        })
        res.status(200).json(rankings);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
})

// Rota PUT para atualizar os dados de um ranking
router.put('/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const { minigame, usuario, pontuacao, tempo } = req.body;

        const rankingAtualizado = await prisma.ranking.update({
            where: { id },
            data: {
                minigame,
                usuario,
                pontuacao,
                tempo,
                dataAtualizacao: new Date(),
            },
        })

        const rankings = await prisma.ranking.findMany({
            orderBy: [
                { pontuacao: 'desc' },
                { tempo: 'asc' },
            ],
        })

         // Atualiza a posição de cada registro
         for (let i = 0; i < rankings.length; i++) {
            await prisma.ranking.update({
                where: { id: rankings[i].id },
                data: { posicao: i + 1 },
            })
        }

        res.status(200).json(rankingAtualizado);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' })
    }
});

// Rota DELETE 
router.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params;

        await prisma.ranking.delete({
            where: { id },
        });

        res.status(200).json({message: 'Ranking excluído com sucesso.'});
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' })
    }
})

export default router;
