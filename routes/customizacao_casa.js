import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

// Rota POST para customização da casa
router.post('/', async (req,res) => {

    try {
        
        const {moveis_id, papel_de_parede_id, piso_id} = req.body

        const novaCustomizacao = await prisma.customizacao_casa.create ({
            data: {
                moveis_id,
                papel_de_parede_id,
                piso_id,
            }
        })

        res.status(200).json(novaCustomizacao)
    } catch (err) {
        console.error('Erro no servidor:', err)
        res.status(500).json({message: 'Erro no servidor, tente novamente'})
    }
})

// Rota GET para listar
router.get('/', async (req,res) => {

    try {
        const customizacoes = await prisma.customizacao_casa.findMany()
        res.status(200).json(customizacoes)
    } catch (err){
        console.error('Erro no servidor', err)
        res.status(500).json({message: 'Erro no servidor, tente novamente'})
    }
})

// Rota GET para buscar por ID
router.get('/:id', async (req,res) => {

    try {
        const {id} = req.params

        const customizacao = await prisma.customizacao_casa.findUnique ({
            where: {id}
        })

        res.status(200).json(customizacao)
    } catch (err) {
        console.error('Erro no servidor', err)
        res.status(500).json({message: 'Erro no servidor, tente novamente'})
    }
})

// Rota PUT para atualizar uma customização
router.put('/:id', async (req,res) => {

    try {
        const {id} = req.params
        
        const {moveis_id, papel_de_parede_id, piso_id} = req.body

        const customizacaoAtualizada = await prisma.customizacao_casa.update ({
            where: {id},
            data: {
                moveis_id,
                papel_de_parede_id,
                piso_id
            }
        })

        res.status(200).json(customizacaoAtualizada)
    } catch (err) {
        console.error('Erro no servidor', err)
        res.status(500).json ({message: 'Erro no servidor, tente novamente'})
    }
})

// Rota DELETE para remover uma customização
router.delete('/:id', async (req,res) => {

    try {
        const {id} = req.params

        await prisma.customizacao_casa.delete ({
            where: {id}
        })

        res.status(200).send()
    } catch (err) {
        console.error('Erro no servidor', err)
        res.status(500).json({message: 'Erro no servidor, tente novamente'})
    }
})

export default router

