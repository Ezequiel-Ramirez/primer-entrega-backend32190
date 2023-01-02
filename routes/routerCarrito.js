const express = require('express');
const { Router } = express
const controllerCarrito = require('../controllers/carritoControllers.js')

const routerCarrito = new Router();

//rutas carrito
//POST: '/' - Crea un carrito y devuelve su id.
routerCarrito.post('/', controllerCarrito.postNewCarrito)

//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
routerCarrito.get('/:id/productos', controllerCarrito.getCarritoById)

//DELETE: '/:id' - Vacía un carrito y lo elimina.
routerCarrito.delete('/:id', controllerCarrito.deleteCarrito)

//POST: '/:id/productos' - Para incorporar productos al carrito por su id de carrito.
routerCarrito.post('/:id/productos', controllerCarrito.postCarrito)

//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCarrito.delete('/:id/productos/:id_prod', controllerCarrito.deleteProductoCarrito)

module.exports = routerCarrito;
