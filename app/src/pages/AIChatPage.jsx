import React from 'react';
import AIChat from '../Components/AIChat/AIChat';

const AIChatPage = () => {
    return (
        <div>
            <h2 style={{ marginBottom: '1rem' }}>AI Food Habits Chat</h2>
            <AIChat wid={600} hei={750} />
        </div>
    );
};

export default AIChatPage;