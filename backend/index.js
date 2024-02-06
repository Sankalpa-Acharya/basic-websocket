import express from "express";
import { homeRoute } from "./routes/homeRoute.js";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("new user has connected", socket.id);

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});

// app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/", homeRoute);
// app.use(express.static(path.resolve("./public")));

server.listen(3000, () => {
  console.log("server runinng on port 3000");
});
