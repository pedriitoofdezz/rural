import User from '../models/User.js';
import { hashPassword } from '../utils/password.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() });

    if (user && user.passwordHash === hashPassword(password)) {
      return res.json({
        token: 'fake-jwt-token',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesion' });
  }
}
