import express from 'express'
import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()
const router = express.Router()

// Rota POST
router.post('/', async (req,res) =>{

    try {
        const {loja_id, quantidade_comprado} = req.body

        const novoItem = await Prisma.itens.create({
            data: {
                loja_id,
                quantidade_comprado
            }
        })

        res.status(200).json(novoItem)
    } catch (err) {
        console.error('Erro no servidor', err)
        res.status(500).json({ message: 'Erro no servidor. tente novamente'})
    }
})

// Rota GET
router.get('/', async (req,res) => {

    try {
        const itens = await Prisma.itens.findMany()
        res.status(2000).json(itens)
    } catch (err){
        console.error('Erro no servidor', err)
        res.status(500).json({ message: 'Erro no servidor. tente novamente'})
        
    }
})

// Rota GET para buscar por ID
router.get('/:id', async (req,res) => {

    try {
        const {id} = req.params

        const item = await Prisma.itens.findUnique ({
            where: {id}
        })

        res.status(200).json(item)
    } catch (err) {
        console.error('Erro no servidor', err)
        res.status(500).json({ message: 'Erro no servidor. tente novamente'})
    }
})

// Rota PUT
router.put('/:id', async (req,res) => {

    try {
        const {id} = req.params
        const {loja_id, quantidade_comprado} = req.body

        const itemAtualizado = await Prisma.itens.update ({
            where: {id},
            data: {
                loja_id,
                quantidade_comprado
            }
        })

        res.status(200).json(itemAtualizado)
    } catch (err) {
        console.error('Erro no servidor', err)
        res.status(500).json({ message: 'Erro no servidor. tente novamente'})
    }
})

// Rota DELETE
router.delete('/:id', async (req,res) => {

    try {
        const {id} = req.params

        await Prisma.itens.delete ({
            where: {id}
        })

        res.status(200).send()
    } catch (err) {
        console.error('Erro no servidor', err)
        res.status(500).json({ message: 'Erro no servidor. tente novamente'})
    }
})

export default router