import React from "react";

function WelcomePage() {
    return (
        <div style={styles.body}>
            <h1 style={styles.h1}>Welcome to Time Sheet Hr Employee App</h1>
        </div>
    );
}

const styles = {
    body: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        margin: '0',
        
    },
    h1: {
        textAlign: 'center',
    },
};

export default WelcomePage;
