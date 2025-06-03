import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes/recipeRouter";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
