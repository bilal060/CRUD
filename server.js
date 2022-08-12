import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.DATABASE_LOCAL, {}).then(() => {
  console.log("DB Connection Successful");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening  port http://localhost:${port}`);
});
