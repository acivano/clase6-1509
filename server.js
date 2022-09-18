const express = require('express')
const random = require('random')
const app = express()
const Contenedor = require('./contenedor')

app.get('/productos', (req,res) => {
    let productosClase = new Contenedor('productos.txt')
    let respuesta = productosClase.getAll()
    respuesta.then( val => res.send(val))
})

app.get('/productoRandom', (req,res) => {
    let productosClase = new Contenedor('productos.txt')
    let randomNum = -1
    productosClase.quantityProduct().then( val => {
        randomNum = random.int(1, val)
        let respuesta = productosClase.getById(randomNum)
        respuesta.then( val => res.send(val))
    })
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))