import express, {Application, Request, Response} from 'express';
const connectDB = require('./config/db');

const app: Application = express();

// connect to mongoatlas
connectDB();

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

app.get('/', (req: Request, res: Response) => res.send('API running...'));





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));