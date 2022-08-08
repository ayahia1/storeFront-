import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app: express.Application = express();
const address: string = (process.env.port as string) || "3000";

const corsOption = {
  optionsSuccessStatus: 200, // for some lagacy browsers
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get("/", function (req: Request, res: Response) {
  res.send("API is working!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
