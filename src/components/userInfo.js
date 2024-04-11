import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: white;
  max-height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  `

  export const UserInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `

  export const Headline = styled.h2`
    margin: 0;
    padding: 0;
    text-decoration: underline;
  `
  export const Name = styled.h3`
    margin: 0;
    padding: 0;
  `

  export const Image = styled.img`
    width: 70px;
  `

  export const Logout = styled.button`
    width: 150px;
    padding: 8px 0px;
    
  `