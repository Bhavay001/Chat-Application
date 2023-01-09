require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
// to accept json data
app.use(express.json());
app.use(cors());
connectDB();
const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use("/api/user", userRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// error handling middlewares in the all the the routes other than the sprecified will be handeled
// when the route is not found
app.use(notFound);
// even after notfound there is some error will go inside this
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
  },
});
// io.on will listen to everyone make a socket instance for bhavay,yuvraj,tushar
// socket.on will deal with particuar connection when a user is sending setup event
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  // creating a new socket where frontend will send the data and join the room
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // contains logged in users id
    // console.log(userData._id);
    socket.emit("connected");
  });

  // whever we click on any of the chat
  // room hass the seleted chat id
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    // check which room does the chat belong to
    var chat = newMessageRecieved.chat;

    if (!chat.users) {
      console.log("chat.users not defined");
    }

    // if it is a group chat we need to send message to everyone exept himself
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
