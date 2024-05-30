import React from 'react';

const AboutComponent = () => {
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1>About Our Website</h1>
                <div style={styles.text}>
                    <p>Welcome to our website! We strive to provide you with the best experience possible. Our platform offers a wide range of features tailored to meet your needs. Whether you're here to learn, connect, or explore, we've got you covered.</p>
                    <p>Our team is dedicated to continuous improvement, ensuring that our website remains user-friendly, informative, and enjoyable. We value your feedback and are constantly working to enhance your browsing experience.</p>
                    <p>Thank you for choosing us. We're excited to have you on board!</p>
                </div>
                
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      
        padding: '20px',
    },
    content: {
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        textAlign: 'left',
        marginRight: '20px',
        flex: 1,
    },
    
    h1: {
        marginBottom: '20px',
    },
    p: {
        lineHeight: '1.6',
        marginBottom: '20px',
    },
};

export default AboutComponent;
