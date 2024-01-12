import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createApoloGraphqlServer from './graphql';

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    app.use("/graphql", expressMiddleware(await createApoloGraphqlServer()));
    
    app.get("/", (req, res) => {
            res.json({ message: "Server is up and running."
        });
    });
    app.listen(PORT, () => console.log(`App is running on PORT: ${PORT}`));
}

init();