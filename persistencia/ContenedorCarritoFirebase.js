const { db } = require('../config/firebaseConfig');
const admin = require('../config/firebaseConfig');

class ContenedorCarritoFirebase {
    constructor() {
        this.carrito = db.collection('carrito');
    }

    //creo un carrito con su id, timestamp y array de productos vacio y lo guardo  en firebase
    async saveCarrito() {
        try {
            const carrito = {
                id: Date.now(),
                timestamp: new Date(),
                productos: []
            }
            await this.carrito.add(carrito)
            return carrito.id
        } catch (error) {
            console.log(error)
        }
    }


    //obtengo todos los carritos
    async getAllCarritos() {
        try {
            const carritos = await this.carrito.get()
            return carritos
        } catch (error) {
            console.log('Error en getAllCarritos: ', error)
        }
    }

    //DELETE: '/:id' - Vacía un carrito y lo elimina.
    async deleteCarrito(id) {
        try {
            await this.carrito.doc(id).delete()
            return id
        } catch (error) {
            console.log('Error en deleteCarrito: ', error)
        }
    }

    //GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
    async getProductosCarrito(id) {
        if(!id){
            const query = await this.carrito.get()
            const response = query.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            return response
        }

        try {
            const doc = await this.carrito.doc(id).get()
            const response = { id: doc.id, ...doc.data() }
            return response
        } catch (error) {
            console.log('Error en getProductosCarrito: ', error)
        }
    }

    //POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
    async addProductoCarrito(id, producto) {
        if(!id){
            const query = await this.carrito.add(producto)
           const response = {id: query.id, ...producto}
            return response
        }

        try {
            const doc = await this.carrito.doc(id).set(producto)
            const response = { id: doc.id, ...producto }
            return response
        } catch (error) {
            console.log('Error en addProductoCarrito: ', error)
        }
    }

    //DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
    async deleteProductoCarrito(id, id_prod) {
        try {
            const doc = await this.carrito.doc(id).get()
            const response = { id: doc.id, ...doc.data() }
            const productos = response.productos
            return productos
        } catch (error) {
            console.log('Error en deleteProductoCarrito: ', error)
        }
    }
}

          

module.exports = ContenedorCarritoFirebase;
