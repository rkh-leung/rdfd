const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

const dialogFlowRoutes = require("./routes/dialogFlowRoutes");
// const fulfillmentRoutes = require("./routes/fulfillment");

app.use(bodyParser.json());

app.use(dialogFlowRoutes);
// app.use(fulfillmentRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log('Listening on port', port)
})
