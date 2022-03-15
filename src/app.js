import "./database";
import express from 'express';
import inquiryRoutes from './routes/inquiry.route';
import blogRoutes from './routes/blog.route';
import authRoutes from './routes/authentication.route';
import commentRoutes from './routes/comment.route';
import newsletterRoutes from './routes/newsletter.route';

//swagger-ui
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../api.json";

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

export default server;

server.use(cors());
server.use(morgan("dev"));
server.use("/api/v1/", authRoutes);
server.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, { explorer: true })
);

server.use("*", (req, res, next) => {
    res.status(404).json({
        error: "NOT FOUND",
    });
});