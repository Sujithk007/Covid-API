const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const CircularJSON = require("circular-json");
var cors = require("cors");

const dataFilter = require("./dataFilter");

// const fileData = require("./data.json");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

var main_raw_data = {};

const update =  async()=>{
  const response = JSON.parse(
    CircularJSON.stringify(
      await axios.get("https://api.covid19india.org/v4/min/timeseries.min.json")
    )
  );
  main_raw_data = response.data;
  console.log(main_raw_data);
}

app.get("/", (req, res) => {
  const sg = dataFilter(main_raw_data);
  res.send(sg);
});

app.listen(3000, async() =>{
  await update();
  console.log("Server started at 3000...........");
  setInterval(async () => {
    const response = JSON.parse(
      CircularJSON.stringify(
        await axios.get(
          "https://api.covid19india.org/v4/min/timeseries.min.json"
        )
      )
    );
    main_raw_data = response.data;
  }, 14400000);
});
