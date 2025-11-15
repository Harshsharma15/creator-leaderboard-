import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://winovo.io/api/creator/users", {
      headers: {
        "x-creator-auth": process.env.CREATOR_KEY
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
