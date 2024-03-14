const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const bearerToken = require("express-bearer-token");
app.use(bearerToken());
app.use(express.static('public'))

// export router
const {
  productRouter,
  kategoriRouter,
  userRouter,
  transactionRouter,
} = require("./routers");

// path router
app.use("/api/product", productRouter);
app.use("/api/kategori", kategoriRouter);
app.use("/api/auth", userRouter);
app.use("/api/transaction", transactionRouter);

app.get("/api", (req, res) => {
  res.send(`Hello, this is API Raka store`);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const statusMessage = err.message || "ini error";
  return res.status(statusCode).send({
    isError: true,
    message: statusMessage,
    data: null,
  });
});

// app.use(function (req, res) {
//   res.send('Token '+req.token);
// });

app.listen(8000, () => {
  console.log("sedang berjalan");
});
