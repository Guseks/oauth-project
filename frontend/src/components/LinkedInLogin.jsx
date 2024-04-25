import { useState, useEffect } from "react";
import { Headline, Name, UserInfo, Container, Image, Logout } from "./userInfo";
import { LinkedInLoginButton } from "react-social-login-buttons";

const LinkedInLogin = () => {
  const [linkedInUser, setLinkedInUser] = useState(null);
  const clientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
  const redirect_URL = process.env.REACT_APP_LINKEDIN_REDIRECT;
  const scope = "openid profile email";

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const user = queryParams.get("user");
    if (user) {
      //Decode the user
      const decodedUserString = decodeURIComponent(user);
      const userObject = JSON.parse(decodedUserString);
      const newUser = { name: userObject.name, picture: userObject.picture };
      console.log(newUser);
      setLinkedInUser(newUser);
    } else return;
  }, []);
  //En useEffect som kollar om det finns någon user i query string varje gång sidan uppdateras.

  const handleLinkedInLogin = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirect_URL}&scope=${encodeURIComponent(
      scope
    )}`;
    window.location.href = authUrl;
  };

  return (
    <Container>
      <Headline>LinkedIn</Headline>
      {linkedInUser ? (
        <UserInfo>
          <Name>{linkedInUser.name}</Name>
          <Image src={linkedInUser.picture} />
          <Logout onClick={() => setLinkedInUser(null)}>Logout Linkedin</Logout>
        </UserInfo>
      ) : (
        <LinkedInLoginButton onClick={() => handleLinkedInLogin()} />
      )}
    </Container>
  );
};

export default LinkedInLogin;
