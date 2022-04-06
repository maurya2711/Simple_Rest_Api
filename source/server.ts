import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/posts";

const router: Express = express();

//for Logging
router.use(morgan("dev"));
//for parsing the request
router.use(express.urlencoded({ extended: false }));
//for parsing the json
router.use(express.json());

//setting the rule for Api's
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//routes
router.use("/", routes);
//error handling
router.use((req, res, next) => {
  const error = new Error("Not Found");
  return res.status(404).json({ message: error.message });
});

//start the server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
