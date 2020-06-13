const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos (req.body);
    try {
        await pedido.save();
        res.json({mensaje: 'Se agrego un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('Cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }

}

// Mostrar un pedido segun ID

exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('Cliente').populate(
    {
        path: 'pedido.producto',
        model: 'Productos'
    });

    if(!pedido) {
        res.json({mensaje: 'Ese Nro de pedido no existe'});
        return next();
    }
    // mostrar el pedido
    res.json(pedido);
}

// Actualizar un pedido

exports.actualizarPedido = async (req, res, next) => {
  try {
        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body, {
            new: true
        } )
        .populate('Cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido)

  } catch(error) {
      console.log(error);
      next();
  }

}

// Eliminar un pedido

exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id: req.params.idPedido});
        res.json({mensaje: 'El pedido se ha eliminado'});

    } catch (error) {
        console.log(error);
        next();

    }

}