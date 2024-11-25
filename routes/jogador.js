import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'

const prisma = new PrismaClient()
const router = express.Router()

// Rota POST para cadastrar um novo jogador
router.post('/', async (req,res) => {
    
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

// Rota GET para pelo ID
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const jogador = await prisma.jogador.findUnique({
        where: { id },
      });
  
      res.status(200).json(jogador)
    } catch (err) {
      console.error('Erro ao buscar jogador:', err);
      res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
  })

// Rota PUT para atualizar um jogador
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, usuario, senha, data_nascimento, cidade, telefone, email, minigames, desbloqueio, quantidade_moedas, nivel, fase } = req.body;
  
    try {
      const jogador = await prisma.jogador.update({
        where: { id },
        data: {
          nome,
          usuario,
          senha,
          data_nascimento: DateTime.fromISO(data_nascimento).toJSDate(),
          cidade,
          telefone,
          email,
          minigames,
          desbloqueio,
          quantidade_moedas,
          nivel,
          fase
        },
      });
  
      res.status(200).json(jogador);
    } catch (err) {
      console.error('Erro ao atualizar jogador:', err);
      res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
  })

// Rota DELETE 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const jogador = await prisma.jogador.delete({
        where: { id },
      });
  
      res.status(200).json({ message: 'Jogador excluído com sucesso', jogador });
    } catch (err) {
      console.error('Erro ao excluir jogador:', err);
      res.status(500).json({ message: 'Erro no servidor, tente novamente.' });
    }
  })


export default router