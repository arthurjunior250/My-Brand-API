import "./database";
import express from 'express';
import inquiryRoutes from './routes/inquiry.route';
// import blogRoutes from './routes/blog.route';

const server = express();

// default route
server.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "You successfully landed on our My brand app API" })
});

server.use(express.json());

server.use('/api/v1/inquiries', inquiryRoutes);
// server.use('/api/v1/blogs', blogRoutes);;

const port = 3000;

server.listen(port, () => { console.log("Server listening on port " + port) });