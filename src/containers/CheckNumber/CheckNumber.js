import React, {Component, Fragment} from 'react';

import Search from "../../comonents/Search/Search";
import NumberData from "../../comonents/NumberData/NumberData";


class CheckNumber extends Component {
    render() {
        return <Fragment>
            <Search/>
            <NumberData/>
        </Fragment>
    }
}

export  default CheckNumber;