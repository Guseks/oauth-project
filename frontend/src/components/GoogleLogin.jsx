import { useState } from "react";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Headline, Name, UserInfo, Container, Logout, Image } from "./userInfo";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  async function handleGoogleLogin(response) {
    try {
      setUser({
        name: response.name,
        picture: response.picture,
      });
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <Container>
      <Headline>Google</Headline>
      {user ? (
        <UserInfo>
          <Name>{user.name}</Name>
          <Image src={user.picture} />
          <Logout onClick={() => handleLogout()}>Logout Google</Logout>
        </UserInfo>
      ) : (
        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onResolve={({ data }) => {
            handleGoogleLogin(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
      )}
    </Container>
  );
};

export default GoogleLogin;
