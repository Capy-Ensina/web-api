import express from 'express'
import minigames from './routes/minigames.js'
import ranking from './routes/ranking.js'

const app = express()
app.use(express.json())

// registros de cada rota
app.use('/minigames', minigames)
app.use('/ranking', ranking)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

