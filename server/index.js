import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth/authRouter.js";
import userRouter from "./routes/user/userRouter.js";
import collectionRouter from "./routes/collection/collectionRouter.js"
import itemRouter from "./routes/item/itemRouter.js"

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/collections", collectionRouter);
app.use("/items", itemRouter);

async function start() {
  try {
    await mongoose
      .connect(process.env.MONGODB_KEY, {
        useNewUrlParser: true,
      })
      .then(() => console.log("DB Connection Successfull!"))
      .catch((err) => {
        console.log(err);
      });

    app.listen(PORT, () => {
      console.log(`🚀 Server has been started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
