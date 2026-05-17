import React from 'react';
import "./css/main.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(<React.StrictMode>
    <AuthProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthProvider>
</React.StrictMode>);

reportWebVitals();
