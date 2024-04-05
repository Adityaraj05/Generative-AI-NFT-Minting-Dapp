import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { ContractProvider } from './context/mintContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContractProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ContractProvider>
);
