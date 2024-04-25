import { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { Headline, Name, UserInfo, Container, Image, Logout } from "./userInfo";

const FacebookLogin = () => {
  const [user, setUser] = useState(null);

  async function handleFacebookLogin(data) {
    try {
      setUser({
        id: data.id,
        name: data.name,
        picture: data.picture.data.url,
      });
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  }

  return (
    <Container>
      <Headline>Facebook</Headline>
      {user ? (
        <UserInfo>
          <Name>{user.name}</Name>
          <Image src={user.picture} />
          <Logout onClick={() => setUser(null)}>Logout Facebook</Logout>
        </UserInfo>
      ) : (
        <LoginSocialFacebook
          appId={process.env.REACT_APP_FB_APP_ID}
          onResolve={({ data }) => {
            handleFacebookLogin(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      )}
    </Container>
  );
};

export default FacebookLogin;
