import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 40px;
  text-align: center;
  width: 100%;
  position: relative;
  bottom: 0;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
  font-family: Arial, sans-serif;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Movie Finder &copy; {new Date().getFullYear()} | Created by Sowmya</FooterText>
    </FooterContainer>
  );
};

export default Footer;
