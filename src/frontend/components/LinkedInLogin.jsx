import { useState, useEffect } from "react";
import { Headline, Name, UserInfo, Container, Image, Logout } from "./userInfo";
import { LinkedInLoginButton } from "react-social-login-buttons";

const LinkedInLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const user = queryParams.get("user");

    if (user) {
      //Decode the user
      const decodedUserString = decodeURIComponent(user);
      const userObject = JSON.parse(decodedUserString);
      console.log(userObject);
      return;
      // setUser(userObject);
    } else return;
  }, []);
  //En useEffect som kollar om det finns någon user i query string varje gång sidan uppdateras.

  const clientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
  const redirect_URL = process.env.REACT_APP_LINKEDIN_REDIRECT;
  const scope = "openid profile email";

  const handleLinkedInLogin = async () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirect_URL}&scope=${encodeURIComponent(
      scope
    )}`;
    window.open(authUrl, "_blank", "width=500,height=600");
  };

  return (
    <Container>
      <Headline>LinkedIn</Headline>
      {user ? (
        <UserInfo>
          <Name>{user.name}</Name>
          <Image src={user.picture} />
          <Logout onClick={() => setUser(null)}>Logout Linkedin</Logout>
        </UserInfo>
      ) : (
        <LinkedInLoginButton onClick={() => handleLinkedInLogin()} />
      )}
    </Container>
  );
};

export default LinkedInLogin;
