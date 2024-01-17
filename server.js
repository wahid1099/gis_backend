const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 3000;
require("dotenv").config();
app.use(cors()); // Enable CORS for all routes

// Replace with your Kobo Toolbox API URL and token
const koboApiUrl = "https://kf.kobotoolbox.org/api/v2/assets.json";
const koboToken = process.env.API_KEY;
const activedata =
  "https://kf.kobotoolbox.org/api/v2/assets/ag6smssL62Kcrm6tK8Uute/data.json";

app.get("/getKoboData", async (req, res) => {
  try {
    const response = await axios.get(koboApiUrl, {
      headers: {
        Authorization: `Token ${koboToken}`,
      },
    });

    const koboData = response.data; // Assuming 'results' is the array containing data
    res.json(koboData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/fetchData", async (req, res) => {
  try {
    const response = await axios.get(activedata, {
      headers: {
        Authorization: `Token ${koboToken}`,
      },
    });

    // Assuming the API response is JSON data
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
