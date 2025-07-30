// src/index.ts

//import express request response from express library
import express, { Request, Response } from "express";

//express function returns a web server application instance which we can use for different web operations 
const app = express();
const PORT = 3000;

//defining a HTTP GET Route usign .get() method 
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

//Begin listing for HTTP requests on PORT
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
