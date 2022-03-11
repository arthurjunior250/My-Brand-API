import "./database";
import express from 'express';
import inquiryRoutes from './routes/inquiry.route';
import blogRoutes from './routes/blog.route';
import authRoutes from './routes/authentication.route';
import commentRoutes from './routes/comment.route';
import newsletterRoutes from './routes/newsletter.route';

const server = express();

// default route
server.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "You successfully landed on My brand app API" })
});

server.use(express.json());

server.use('/api/v1/inquiry', inquiryRoutes);
server.use('/api/v1/blog', blogRoutes);
server.use('/api/v1/authentication', authRoutes);
server.use('/api/v1/newsletter', newsletterRoutes);
server.use('/api/v1/comment', commentRoutes);


const port = process.env.PORT;

server.listen(port, () => { console.log("Server listening on port " + port) });