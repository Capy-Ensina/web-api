import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'

const prisma = new PrismaClient()
const router = express.Router()
const horarioBrasilia = DateTime.now().setZone('America/Sao_Paulo').toJSDate()

// Rota POST para criar um novo conteudo
router.post('/', async (req, res) => {

    try {
        const { titulo, conteudo }= req.body

        const novoConteudo = await prisma.conteudo.create({
            data: {
                titulo,
                conteudo,
                data_ultimo_update: horarioBrasilia
            }
        })

        res.status(200).json(novoConteudo)
    } catch (err){
        console.error('Erro no servidor:', err);
        res.status(500).json({message: 'Erro no servidor, tente novamente'})

    }
})

// Rota PUT para editar um conteudo
router.put('/:id', async (req, res) => {

    try {
        const { id } = req.params // o id será passado como parâmetro
        const { conteudo, titulo } = req.body

        const conteudoEdit = await prisma.conteudo.update ({
            where: { id: id}, // id do conteudo
            data: {
                titulo,
                conteudo,
                data_ultimo_update: new Date(),    
            }
        })
    
        res.status(200).json(conteudoEdit)
    } catch (err){
        console.error('Erro no servidor:', err);
        res.status(500).json({message: 'Erro no servidor, tente novamente'})

    }
})

// Rota GET para listar todos os conteúdos
router.get('/', async (req, res) => {

    try {
        const conteudos = await prisma.conteudo.findMany()

        res.status(200).json(conteudos)
    } catch(err) {
        console.error('Erro no servidor', err)
        res.status(500).json({message:'Erro no servidor, tente novamente.'})
    }
})

// Rota DELETE para excluir um conteúdo
router.delete('/:id', async (req,res) => {
    const { id } = req.params

    try {
        const conteudoExiste = await prisma.conteudo.findUnique({
            where: {id: id}
        })

        await prisma.conteudo.delete({
            where: {id: id}
        })

        res.status(200).json({message: 'Conteúdo deletado com sucesso.'})
    } catch (err){
        console.error('Erro ao deltar conteúdo', err)
        res.status(500).json({message: 'Erro no servidor, tente novamente.'})
    }
})
export default router