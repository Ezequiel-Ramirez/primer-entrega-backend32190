const ContenedorCarritoFirebase = require('../persistencia/ContenedorCarritoFirebase');

const controllerCarrito = new ContenedorCarritoFirebase();

const getAllCarritos = async (req, res) => {
    const carritos = await controllerCarrito.getAllCarritos();
    res.json(carritos);
}

const getCarritoById = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const carrito = await controllerCarrito.getProductosCarrito(id);
        res.json(carrito);
    } else {
        const carritos = await controllerCarrito.getAllCarritos();
        res.json(carritos);
    }
}

const postCarrito = async (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    const newProducto = await controllerCarrito.addProductoCarrito(id, producto);
    res.json(newProducto);
}

const postNewCarrito = async (req, res) => {
    const carrito = req.body;
    const newCarrito = await controllerCarrito.saveCarrito(carrito);
    res.json(newCarrito);
}

const deleteCarrito = async (req, res) => {
    const { id } = req.params;
    const carrito = await controllerCarrito.deleteCarrito(id);
    res.json(carrito);
}

const deleteProductoCarrito = async (req, res) => {
    const { id, id_prod } = req.params;
    const producto = await controllerCarrito.deleteProductoCarrito(id, id_prod);
    res.json(producto);
}

module.exports = { getAllCarritos, getCarritoById, postCarrito, postNewCarrito, deleteCarrito, deleteProductoCarrito }



