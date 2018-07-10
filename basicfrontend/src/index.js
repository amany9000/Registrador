import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import New from './new';

ReactDOM.render(<New/>, document.getElementById('root'));
registerServiceWorker();
