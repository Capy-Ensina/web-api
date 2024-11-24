import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rota POST para criar um novo papel de parede
router.post('/', async (req, res) => {
    try {
        const { descricao, imagem } = req.body;

        const novoPapelDeParede = await prisma.papel_de_parede.create({
            data: {
                descricao,
                imagem,
            },
        });

        res.status(200).json(novoPapelDeParede);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET para buscar todos os papéis de parede
router.get('/', async (req, res) => {
    try {
        const papeisDeParede = await prisma.papel_de_parede.findMany();
        res.status(200).json(papeisDeParede);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota GET  por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const papelDeParede = await prisma.papel_de_parede.findUnique({
            where: { id },
        });

        res.status(200).json(papelDeParede);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota PUT para atualizar os dados de um papel de parede
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, imagem } = req.body;

        const papelDeParedeAtualizado = await prisma.papel_de_parede.update({
            where: { id },
            data: {
                descricao,
                imagem,
            },
        });

        res.status(200).json(papelDeParedeAtualizado);
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

// Rota DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.papel_de_parede.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
});

export default router;
