const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function() {

    // Agrega nuevos Clientes x Post

    router.post('/clientes',clienteController.nuevoCliente);

    // Listar Clientes

    router.get('/clientes',clienteController.mostrarClientes);

    // Mostrar un cliente espeficifo

    router.get('/clientes/:idCliente',clienteController.mostrarCliente);

    // Actualizar Cliente
    router.put('/clientes/:idCliente',clienteController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clientes/:idCliente',clienteController.eliminarCliente);

    // iniciar session
    router.post('/iniciar-sesion', clienteController.autenticarCliente);

    
    // PRODUCTOS

    // Nuevos Productos
    router.post('/productos',
    productosController.subirArchivo,
    productosController.nuevoProducto
    );

    // Mostrar Productos

    router.get('/productos', productosController.mostrarProductos);

    //  Muestra un producto segun el id
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    // Actualizar Productos
    router.put('/productos/:idProducto',
    productosController.subirArchivo,
    productosController.actualizarProducto
    );

    //  Eliminar producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto);
    

    // *** PEDIDOS *** //
   // Agregar nuevo pedido
    router.post('/pedidos', pedidosController.nuevoPedido);

    // Mostrar Pedidos

    router.get('/pedidos', pedidosController.mostrarPedidos);

    // Mostrar un pedido segun ID
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);


    // Actualizar un pedido
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    // Eliminar un pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);
    
    // Usuarios

    // Crear cuenta
    router.post('/crear-cuenta', usuariosController.registrarUsuario);
    // iniciar session
    //router.post('/iniciar-sesion', usuariosController.autenticarUsuario);
    
    return router;

}