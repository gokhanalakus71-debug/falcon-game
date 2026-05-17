import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.post("/api/image", async (req, res) => {
  const { prompt } = req.body;

  // TEMP MOCK (for testing first)
  const fakeImage =
    "https://placehold.co/600x400/png?text=UAE+Falcon+AI";

  res.json({ url: fakeImage });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});