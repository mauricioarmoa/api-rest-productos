const Clientes = require('../models/Clientes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Agrega nuevo cliente
exports.nuevoCliente = async (req, res, next) => {

    const cliente = new Clientes(req.body);
    cliente.password = await bcrypt.hash(req.body.password, 12);

    try {
        // Almacenar el registro
        await cliente.save();
        res.json({mensaje:'Se agrego un nuevo Cliente'});
    } catch(error) {
        // si hay error 
        res.send(error);
        next();
    }
    

}

// Muestra todos los clientes

exports.mostrarClientes = async (req, res, next) => {

    try {
        // Almacenar el registro
        const clientes= await Clientes.find({});
        res.json(clientes);
    } catch(error) {
        // si hay error 
        console.log(error);
        next();
    }
    

}

// Actualizar un Cliente por su ID
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, req.body, {
            new : true
        });
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}

// Muestra Cliente por su ID
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if (!cliente) {
        res.json({mensaje: 'El cliente no existe'});
        next()
    }
    res.json(cliente);
}

// Elimina un cliente por su ID 
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id : req.params.idCliente});
        res.json({mensaje : 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Autenticar un Cliente
exports.autenticarCliente  = async (req, res, next) => {
    // buscar el cliente
    const { email, password } = req.body;
    const cliente = await Clientes.findOne({ email });

    if(!cliente) {
        // Si el usuario no existe
        await res.status(401).json({mensaje : 'Ese Cliente no existe'});
        next();
    } else {
        // El  Cliente existe, verificar si el password es correcto o incorrecto
        if(!bcrypt.compareSync(password, cliente.password )) {
            // si el password es incorrecto
            await res.status(401).json({ mensaje : 'Password Incorrecto'});
            next();
        } else {
            // password correcto, firmar el token
            const token = jwt.sign({
                email : cliente.email, 
                nombre: cliente.nombre, 
                id : cliente._id
            }, 
            'LLAVESECRETA', 
            {
                expiresIn : '1h'
            }); 

            // retornar el TOKEN
            res.json({ token });
        }


    }

}