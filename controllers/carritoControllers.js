const ContenedorCarrito = require('../persistencia/ContenedorCarrito.js')

const controllerCarrito = new ContenedorCarrito('./bd/carritos.txt');

const getAllCarritos = async (req, res) => {
    const carritos = await controllerCarrito.getAllCarritos()
    res.json(carritos)
}

const getCarritoById = async (req, res) => {
    const { id } = req.params
    if(id){
        const carrito = await controllerCarrito.getProductosCarrito(Number(id))
        res.json(carrito)
    } else {
        const carritos = await controllerCarrito.getAllCarritos()
        res.json(carritos)
    }   
}

const postCarrito = async (req, res) => {
    const { id } = req.params
    const producto = req.body
    const newProducto = await controllerCarrito.addProductoCarrito(Number(id), producto)
    res.json(newProducto)
}

const postNewCarrito = async (req, res) => {
    const carrito = req.body
    const newCarrito = await controllerCarrito.saveCarrito(carrito)
    res.json(newCarrito)
}

const deleteCarrito = async (req, res) => {
    const { id } = req.params
    const carrito = await controllerCarrito.deleteCarrito(Number(id))
    res.json(carrito)
}

const deleteProductoCarrito = async (req, res) => {
    const { id, id_prod } = req.params
    const producto = await controllerCarrito.deleteProductoCarrito(Number(id), Number(id_prod))
    res.json(producto)
}

module.exports = { getAllCarritos, getCarritoById, postCarrito, postNewCarrito, deleteCarrito, deleteProductoCarrito }