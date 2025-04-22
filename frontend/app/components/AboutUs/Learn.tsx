import React from 'react';

const Learn: React.FC = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>About Us</h1>
            <p>
                Welcome to our Habit Tracker application! Our mission is to help you build and maintain positive habits that lead to a healthier and more productive life.
            </p>
            <h2>What We Offer</h2>
            <ul>
                <li>Easy-to-use habit tracking tools</li>
                <li>Insights and analytics to monitor your progress</li>
                <li>Customizable habit plans to suit your needs</li>
            </ul>
            <h2>Our Vision</h2>
            <p>
                We believe that small, consistent actions can lead to big changes. Our goal is to empower individuals to take control of their habits and achieve their personal goals.
            </p>
            <h2>Contact Us</h2>
            <p>
                Have questions or feedback? Feel free to reach out to us at <a href="#">support@habittracker.com</a>.
            </p>
        </div>
    );
};

export default Learn;