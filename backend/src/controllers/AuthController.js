import {Usuario} from "../models/Usuario.js";

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Usuario.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ message: "Usuario no existe" });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: "Password incorrecta" });
      }

      return res.json({
        message: "Login exitoso",
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Error login" });
    }
  }
}

export default AuthController;