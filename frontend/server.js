const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h2>Simple Form</h2>
    <form method="POST" action="/submit">
      Name: <input name="name"/><br/>
      Email: <input name="email"/><br/>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/submit", async (req, res) => {
  const { name, email } = req.body;

  try {
    const response = await axios.post("http://backend:5000/submit", {
      name,
      email,
    });

    res.send(response.data);
  } catch (error) {
    res.send("Error connecting backend");
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Frontend running on port 3000");
});
