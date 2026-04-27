import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = 3001;

connectDB();

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});