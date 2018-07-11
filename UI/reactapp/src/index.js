import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Blockchain from './Blockchain/Blockchain.js';
import registerServiceWorker from './registerServiceWorker';
import Land from './LandDetails/Land.js'

ReactDOM.render(<Land />, document.getElementById('root'));
registerServiceWorker();
