const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "nO NAME", apiKey, page = 1, limit } = req.query;]

  const { limite = 5, desde = 0 } = req.query;
 

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total, 
    usuarios

  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  //Verificar si el correo existe

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  //GUARDAR EN DB
  await usuario.save();

  res.json({
    msg: "post API controlador",
    usuario: usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API controlador",
  });
};

const usuariosDelete = async (req, res) => {

  const {id} = req.params
  //Borrar fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id)

  //Borrar cambiando el estado a false
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
   usuario
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
