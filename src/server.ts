import express from "express";
import { envVariables } from "./envVariables";
import { connectDB } from "./database/mongodb";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.get("*", (_, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

app.use(errorMiddleware);

connectDB().then(() => {
  const portInYellow = `\x1b[33m${envVariables.PORT}\x1b[0m`;
  app.listen(envVariables.PORT, () => {
    console.log(`Server is running on port ${portInYellow} 🚀🚀🚀`);
  });
});
