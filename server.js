import express from 'express'
import conteudo from './routes/conteudo.js'
import customizacao_casa from './routes/customizacao_casa.js'
import itens from './routes/itens.js'
import jogador from './routes/jogador.js'
import jogadorpontuacao from './routes/jogador_pontuacao.js'
import loja from './routes/loja.js'
import minigames from './routes/minigames.js'
import moveis from './routes/moveis.js'
import papel_de_parede from './routes/papel_de_parede.js'
import piso from './routes/piso.js'
import ranking from './routes/ranking.js'

const app = express()
app.use(express.json())

// registros de cada rota
app.use('/conteudo', conteudo)
app.use('/customizacao_casa', customizacao_casa)
app.use('/itens', itens)
app.use('/jogador', jogador)
app.use('/jogador_pontuacao', jogadorpontuacao)
app.use('/loja', loja)
app.use('/minigames', minigames)
app.use('/moveis', moveis)
app.use('/papel_de_parede', papel_de_parede)
app.use('/piso', piso)
app.use('/ranking', ranking)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

