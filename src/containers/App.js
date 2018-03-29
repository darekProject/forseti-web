import React, {Component} from 'react';


import Header from '../comonents/Header/Header';
import Search from "../comonents/Search/Search";
import NumberData from "../comonents/NumberData/NumberData";
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Search/>
                <NumberData />
            </div>
        );
    }
}

export default App;
