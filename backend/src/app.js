import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Binding of routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoute);

app.listen(PORT, () => console.log(`Server is runnint at port : ${PORT} `));
