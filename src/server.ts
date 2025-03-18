import  express  from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api", router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});