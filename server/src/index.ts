import express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import {createServer as createViteServer} from "vite";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== "production";

const startServer = async () => {
    app.use(cors());
    app.use(express.json());

    app.get("/api", (req: Request, res: Response) => {
        res.json({message: "Hello, world!"});
    });

    if (!isDev) {
        app.use(express.static(path.join(__dirname, "../client/dist")));

        app.get("*", (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"));
        });

        return;
    }

    // Create Vite server in middleware mode
    const vite = await createViteServer({
        server: {middlewareMode: true},
        root: path.join(__dirname, "../../client"),
        configFile: path.join(__dirname, "../../client/vite.config.ts"),
    });

    // Use Vite's connect instance as middleware
    app.use(vite.middlewares);

    // Handle SPA routing
    app.use('*', async (req, res) => {
        try {
            let template = await vite.transformIndexHtml(req.originalUrl, '');
            res.status(200).set({'Content-Type': 'text/html'}).end(template);
        } catch (e: any) {
            console.error(e);
            res.status(500).end(e.message || 'Internal Server Error');
        }
    });
};

startServer()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error starting server:", err);
        process.exit(1);
    });
