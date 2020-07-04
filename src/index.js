import React from 'react';
import Routes from './Routes';
import ReactDOM from 'react-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
console.log(config);
Amplify.configure(config);

ReactDOM.render(<Routes />, document.getElementById('root'));
