const express = require('express');
const { Router } = express
const controllerCarrito = require('../controllers/carritoControllers.js')
const controllerCarritoFirebase = require('../controllers/carritoControllersFirebase.js')

const routerCarrito = new Router();

//rutas carrito
//POST: '/' - Crea un carrito y devuelve su id.
//routerCarrito.post('/', controllerCarrito.postNewCarrito)
routerCarrito.post('/', controllerCarritoFirebase.postNewCarrito)

//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
//routerCarrito.get('/:id/productos', controllerCarrito.getCarritoById)
routerCarrito.get('/:id/productos', controllerCarritoFirebase.getProductosCarrito)

//DELETE: '/:id' - Vacía un carrito y lo elimina.
//routerCarrito.delete('/:id', controllerCarrito.deleteCarrito)
routerCarrito.delete('/:id', controllerCarritoFirebase.deleteCarrito)

//POST: '/:id/productos' - Para incorporar productos al carrito por su id de carrito.
//routerCarrito.post('/:id/productos', controllerCarrito.postCarrito)
routerCarrito.post('/:id/productos', controllerCarritoFirebase.addProductoCarrito)

//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
//routerCarrito.delete('/:id/productos/:id_prod', controllerCarrito.deleteProductoCarrito)
routerCarrito.delete('/:id/productos/:id_prod', controllerCarritoFirebase.deleteProductoCarrito)

module.exports = routerCarrito;
