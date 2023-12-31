import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth/authRouter.js";
import userRouter from "./routes/user/userRouter.js";
import collectionRouter from "./routes/collection/collectionRouter.js"
import itemRouter from "./routes/item/itemRouter.js"
import tagRouter from "./routes/tag/tagRouter.js"
import searchRouter from "./routes/search/searchRouter.js"
import commentWS from "./routes/comment/commentWS.js";
import expressWs from "express-ws";
import initRouter from "./routes/initDB/initRouter.js";
import cookieParser from "cookie-parser"

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const WSServer = expressWs(app);
export const aWss = WSServer.getWss();

app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
  })
);
app.use(express.json());
app.use(cookieParser())
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/collections", collectionRouter);
app.use("/items", itemRouter);
app.use("/tags", tagRouter);
app.use("/search", searchRouter);
app.use("/initDB", initRouter);
app.ws("/", commentWS);

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
