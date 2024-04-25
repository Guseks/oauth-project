import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import querystring from "node:querystring";

const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json(), cors());

async function getLinkedInAccessToken(auth_code) {
  try {
    const reqBody = querystring.stringify({
      grant_type: "authorization_code",
      code: auth_code,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_APP_SECRET,
      redirect_uri: process.env.LINKEDIN_REDIRECT,
    });
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      reqBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    //console.log(response.data);
    return response.data.access_token;
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
}

async function getUserInfo(accessToken) {
  try {
    const userInfo = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return userInfo.data;
  } catch (error) {
    if (error.status === 401) {
      throw Error("Access revoked");
    }
  }
}

app.get("/", (req, res) => {
  console.log("Hello!");
  res.send("Hello!");
});

app.get("/linkedin/callback", async (req, res) => {
  console.log("Im inside /linkedin/callback");
  const auth_code = req.query.code;

  try {
    const accessToken = await getLinkedInAccessToken(auth_code);
    console.log(`AccessToken: ${accessToken}`);
    if (accessToken) {
      const userInfo = await getUserInfo(accessToken, res);
      const redirectUrl = `http://localhost:3000/?user=${encodeURIComponent(
        JSON.stringify(userInfo)
      )}`;
      //redirectUrl kommer ha en query parameter `user` som kommer vara en encodad user. Decoda detta i frontend.
      res.redirect(redirectUrl);
    }
  } catch (error) {
    console.error("Error exchanging auth_code for access token: ", error);
    if (error.message === "Access revoked") {
      res.send("Renew access");
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
