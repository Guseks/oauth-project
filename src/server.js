const express = require('express');
const axios = require('axios');
const cors = require("cors");
const env = require('dotenv')
const querystring = require("node:querystring");
env.config();

const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json());
app.use(cors());

async function getLinkedInAccessToken(auth_code){
  try {
    const reqBody = querystring.stringify({
      grant_type: "authorization_code",
      code: auth_code,
      client_id: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
      client_secret: process.env.REACT_APP_LINKEDIN_APP_SECRET,
      redirect_uri: process.env.REACT_APP_LINKEDIN_REDIRECT
    });
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      reqBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    //console.log(response.data);
    return response.data.access_token;
  }
  catch (error){
    
    console.error("Something went wrong: ", error);
  }
  
}

async function getUserInfo(accessToken, res){
  try {
    const userInfo = await axios.get(
      "https://api.linkedin.com/v2/me", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    console.log(userInfo);
  }
  catch (error){
    if(error.status === 401){
      throw Error("Access revoked");
    }
  }
  
}


app.post('/linkedin/user-info', async (req, res) => {
  const { code } = req.body;
  
 
  try {
    const accessToken = await getLinkedInAccessToken(code);
    console.log(`AccessToken: ${accessToken}`);
    if(accessToken){
      const userInfo_response = await getUserInfo(accessToken, res);
      console.log(userInfo_response);
      res.status(200).json({data: userInfo_response});
    }
    
  } catch (error) {
    console.error("Error exchanging code for access token: ", error);
    if(error.message === "Access revoked"){
      res.send("Renew access")
    }
    else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
