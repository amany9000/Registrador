import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Blockchain from './Blockchain/Blockchain.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Blockchain />, document.getElementById('root'));
registerServiceWorker();
