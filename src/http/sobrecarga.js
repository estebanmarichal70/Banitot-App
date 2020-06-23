const articulos = require("./productos.json")
const articulos2 = require("./productos2.json")
const articulos3 = require("./productos3.json")

const baseUrl = 'http://192.168.1.102:8000'
const basePath = '/api'
const apiUrl = baseUrl + basePath
const axios = require('axios');

async function sobrecargaArticulos() {
    await articulos.forEach(async articulo => {
        await axios.post(`${apiUrl}/articulos`, articulo)
        .then(() => {
            console.log(`Se agrego el articulo ${articulo.nombre}`)
        }).catch(err => console.log(err))
    })
}

async function sobrecargaArticulos2() {
    await articulos2.forEach(async articulo => {
        await axios.post(`${apiUrl}/articulos`, articulo)
        .then(() => {
            console.log(`Se agrego el articulo ${articulo.nombre}`)
        }).catch(err => console.log(err))
    })
}

async function sobrecargaArticulos3() {
    await articulos3.forEach(async articulo => {
        await axios.post(`${apiUrl}/articulos`, articulo)
        .then(() => {
            console.log(`Se agrego el articulo ${articulo.nombre}`)
        }).catch(err => console.log(err))
    })
}

//CARGUEN DE 1 A LA VEZ PORQUE SE PONE LOQUITA Y CRASHEA A LA MIERDA WEY
async function cargarDatos(){
    await sobrecargaArticulos()
    //await sobrecargaArticulos2()
    //await sobrecargaArticulos3()
}

cargarDatos();
