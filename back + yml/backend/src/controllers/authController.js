export function login(req, res) {
  const { email, password } = req.body;

  if (email === 'test@test.com' && password === '123456') {
    return res.json({ token: 'fake-jwt-token' });
  }

  res.status(401).json({ message: 'Invalid credentials' });
}
