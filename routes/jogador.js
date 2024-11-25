import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'

const prisma = new PrismaClient()
const router = express.Router()

// Rota POST para cadastrar um novo jogador
router.post('/jogador', async (req,res) => {
    
    try {
    const {nome, usuario, senha, data_nascimento, cidade, telefone, email, minigames, desbloqueio, quandtidade_moedas, nivel, fase} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashSenha = await bcrypt.hash(senha, salt)

    //criando um novo jogador
    const novoJogador = await prisma.jogador.create({
        data: {
            nome,
            usuario,
            senha: hashSenha,
            data_nascimento: new Date (data_nascimento),
            cidade,
            telefone,
            email,
            minigames: minigames || [],
            desbloqueio: desbloqueio || [],
            quantidade_moedas: quandtidade_moedas || 0,
            nivel: nivel || 1,
            fase: fase || 1,
        }
    })
    
    // retorna o jogador criado com status 201
    res.status(201).json(novoJogador)
    } catch (err){
        console.error('Erro no servidor:', err)
        res.status(500).json({message: 'Erro no servidor, tente novamente.'})
    }
})

// Rota GET para listar jogadores
router.get('/', async (req,res) => {

    try {
        const jogadores = await prisma.jogador.findMany();
        res.status(200).json(jogadores)
    } catch (err) {
        console.error('Erro ao buscar jogadores', err)
        res.status(500).json({message: 'Erro no servidor, tente novamente'})
    }
})

export default router