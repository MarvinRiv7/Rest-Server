const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la Base de Datos`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo: correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe en la Base de Datos`);
  }
};
const exiteUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  exiteUsuarioPorId
};
