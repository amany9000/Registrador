import React, { Component } from 'react';

import './Main.css';
import {Link} from 'react-router-dom';
import { Header, Icon ,Card,Menu} from 'semantic-ui-react';
import Main from './Main';

class Home extends Component {

  render() {

    return (
        <div>
            <Main/>
            <div>
                <h2>This is home page</h2>
            </div>
        </div>
    )
  }
}

export default Home;
