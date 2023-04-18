const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('Servidor conectado')
})

const { getJoyas, estructureHATEOAS, getFilter } = require('./server')

const reportarConsultas = async (req, res, next) => {
    const params = req.params
    const url = req.url
    console.log(`Hoy ${new Date()} se ha recibido una consulta en la ruta ${url} con los parametros:`, params)
    next()
}


app.get('/joyas', reportarConsultas, async (req, res) => {
    try {
        const query = req.query
        const result = await getJoyas(query)
        const HATEOAS = await estructureHATEOAS(result)
        res.json(HATEOAS)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Error al obtener las joyas')
    }
})


app.get('/joyas/filtros', reportarConsultas, async (req, res) => {
    try {
        const query = req.query
        const inventary = await getFilter(query)
        res.json(inventary)
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Error al obtener las joyas')
    }
})

