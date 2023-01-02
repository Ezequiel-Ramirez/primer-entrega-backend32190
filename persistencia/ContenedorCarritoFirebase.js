const db = require('../config/firebaseConfig');
const admin = require('../config/firebaseConfig');

class ContenedorCarritoFirebase {
    constructor() {
        this.carrito = db.collection('carrito');
    }

     //creo un carrito con su id, timestamp y array de productos vacio y lo guardo en el archivo y devuelve su id en firebase
    async saveCarrito() {
        try {
            const carrito = {
                id: Date.now(),
                timestamp: new Date(),
                productos: []
            }
            const carritos = await this.getAllCarritos()
            carritos.push(carrito)
            await this.carrito.add(carrito)
            return carrito.id
        } catch (error) {
            console.log('Error en saveCarrito: ', error)
        }
    }

    //obtengo todos los carritos
    async getAllCarritos() {
        try {
            const carritos = await this.carrito.get();
            return carritos;
        } catch (error) {
            //si no existe el archivo lo creo
            await this.carrito.add(carrito)
            return []
        }
    }

//DELETE: '/:id' - Vacía un carrito y lo elimina.
    async deleteCarrito(id) {
        try {
            const carritos = await this.getAllCarritos()
            const carrito = carritos.find((carrito) => carrito.id === id)
            if (!carrito) {
                return { error: 'carrito no encontrado' }
            } else {
                const carritoFiltrado = carritos.filter((carrito) => carrito.id !== id)
                await this.carrito.doc(id).delete()
                return carrito
            }
        } catch (error) {
            console.log('Error en deleteCarrito: ', error)
        }
    }

      //GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
      async getProductosCarrito(id) {
        try {
            const carritos = await this.getAllCarritos()
            const carrito = carritos.find((carrito) => carrito.id === id)
            if (!carrito) {
                return { error: 'carrito no encontrado' }
            } else {
                return carrito.productos
            }
        } catch (error) {
            console.log('Error en getProductosCarrito: ', error)
        }
    }

    //POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
    async addProductoCarrito(id, producto) {
        try {
            const carritos = await this.getAllCarritos()
            const carrito = carritos.find((carrito) => carrito.id === id)
            if (!carrito) {
                return { error: 'carrito no encontrado' }
            } else {
                carrito.productos.push(producto)
                await this.carrito.doc(id).update(carrito)
                return carrito
            }
        } catch (error) {
            console.log('Error en addProductoCarrito: ', error)
        }
    }

    //DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
    async deleteProductoCarrito(id, id_prod) {
        try {
            const carritos = await this.getAllCarritos()
            const carrito = carritos.find((carrito) => carrito.id === id)
            if (!carrito) {
                return { error: 'carrito no encontrado' }
            } else {
                const producto = carrito.productos.find((producto) => producto.id === id_prod)
                if (!producto) {
                    return { error: 'producto no encontrado' }
                } else {
                    const productosFiltrados = carrito.productos.filter((producto) => producto.id !== id_prod)
                    carrito.productos = productosFiltrados
                    await this.carrito.doc(id).update(carrito)
                    return carrito
                }
            }
        } catch (error) {
            console.log('Error en deleteProductoCarrito: ', error)
        }
    }
}

module.exports = ContenedorCarritoFirebase;
