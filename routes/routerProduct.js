const express = require('express');
const { Router } = express
const authAdmin = require('../middleware/authAdmin.js')
const controllerProductos = require('../controllers/productsController.js')

const routerProductos = new Router();

//rutas productos

//GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
routerProductos.get('/:id?', controllerProductos.getProductById)

//POST: '/' - Para incorporar productos al listado (disponible para administradores)
//En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }
routerProductos.post('/', authAdmin, controllerProductos.postProduct)

//PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routerProductos.put('/:id', authAdmin, controllerProductos.putProduct)

//DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routerProductos.delete('/:id', authAdmin, controllerProductos.deleteProduct)

module.exports = routerProductos;






