import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import audioBookRoutes from "./routes/audioBook.route.js";
import reviewRoutes from "./routes/review.route.js";

const app = express();
dotenv.config();

//Database Connection
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/audio-book",audioBookRoutes);

app.use("/api/review",reviewRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
