const models = require('../models/productos.js');
const {connect} = require('../config/mongoDbConnection.js');
const { default: mongoose } = require('mongoose');

class ContenedorProductosMongoDB {
    constructor() {
        connect();
    }

    async save(producto) {
        try {
            const newProduct = await models.create(producto);
            return newProduct;
        } catch (error) {
            console.log(error);
        } finally {
            mongoose.disconnect();
        }
    }

    async getById(id) {
        try {
            const product = await models.findById(id);
            return product;
        }
        catch (error) {
            console.log(error);
        } finally {
            mongoose.disconnect();
        }
    }

    async getAll() {
        try {
            const products = await models.find();
            return products;
        } catch (error) {
            console.log(error);
        } finally {
            mongoose.disconnect();
        }
    }

    async deleteById(id) {
        try {
            const product = await models.findByIdAndDelete(id);
            return product;
        } catch (error) {
            console.log(error);
        } finally {
            mongoose.disconnect();
        }
    }

    async deleteAll() {
        try {
            const products = await models.deleteMany();
            return products;
        } catch (error) {
            console.log(error);
        } finally {
            mongoose.disconnect();
        }
    }

    async updateById(id, producto) {
        try {
            const product = await models.findByIdAndUpdate(id, producto);
            return product;
        } catch (error) {
            console.log(error);
        } finally {
            mongoose.disconnect();
        }
    }
}

module.exports = ContenedorProductosMongoDB;

