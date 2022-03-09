import "./database";
import express from 'express';
import userRoutes from './routes/users.route';
import adminRoutes from './routes/admin.route';
import authRoutes from './routes/authentication.route';

const server = express();

// default route
server.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "You successfully landed on our My brand app API" })
});

server.use(express.json());

server.use('/api/v1/users', userRoutes);
server.use('/api/v1/admin/', adminRoutes);
server.use('/api/v1/authentication', authRoutes);


const port = 3000;

server.listen(port, () => { console.log("Server listening on port " + port) });