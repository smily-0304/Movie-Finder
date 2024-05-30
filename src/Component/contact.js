import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f0f0f0;
  min-height: 10vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ContactLabel = styled.span`
  font-weight: bold;
`;

const Contact = () => {
  return (
    <Container>
      <Header>Contact Us</Header>
      <Paragraph>
        Have questions, suggestions, or feedback? We'd love to hear from you!<br></br> Feel free to
        reach out to us using the following contact information:
      </Paragraph>
      <ContactInfo>
        <ContactLabel>Email:</ContactLabel> sowmya@moviefinder.com <br />
        <ContactLabel>Phone:</ContactLabel> +1 (555) 123-4567 <br />
        <ContactLabel>Address:</ContactLabel> 123 Movie Street, Hollywood, CA 90001
      </ContactInfo>
      <Paragraph>
        Our team is dedicated to providing excellent customer service and will respond to <br></br>your
        inquiries as soon as possible. Thank you for choosing Movie Finder!
      </Paragraph>
    </Container>
  );
};

export default Contact;
