// In this file we are going to connect our React application with the HTML file
import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ this is the fix
import App from './App';

// ✅ React 18+ style
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// By this line, we will connect to the div with the id='root'
