const ContenedorProductosMongoDB = require('../persistencia/ContenedorProductosMongoDB.js');

const controllerProductos = new ContenedorProductosMongoDB();

const getAllProducts = async (req, res) => {
    const products = await controllerProductos.getAll();
    res.json(products);
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const product = await controllerProductos.getById(id);
        res.json(product);
    } else {
        const products = await controllerProductos.getAll();
        res.json(products);
    }
}

const postProduct = async (req, res) => {
    const product = req.body;
    const newProduct = await controllerProductos.save(product);
    res.json(newProduct);
}

const putProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    const newProduct = await controllerProductos.updateById(id, product);
    res.json(newProduct);
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await controllerProductos.deleteById(id);
    res.json(product);
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}