const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q, nombre = 'nO NAME', apiKey, page = 1, limit} = req.query;

  res.json({
    msg: "get API controlador",
    q,
    nombre, 
    apiKey,
    page,
    limit
  });
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

  res.json({
    msg: "post API controlador",
    nombre: nombre,
    edad: edad,
  });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id

  res.json({
    msg: "put API controlador",
    id
  });
}

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API controlador",
  });
}

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API",
  });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}