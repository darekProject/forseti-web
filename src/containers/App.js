import React, {Component} from 'react';

import Header from '../comonents/Header/Header';
import Unauthorized from '../comonents/Unauthorized/Unauthorized';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                {/*<Unauthorized/>*/}
            </div>
        );
    }
}

export default App;
