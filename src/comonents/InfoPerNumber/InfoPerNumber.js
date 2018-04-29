import React from 'react';

import './InfoPer.css'

const InfoPerNumber = props => {
    return <div className="container">
        <div className="row">
            <div className="col-lg-12 info-per-wrapper">
                <div className="wrapper-information">
                    <p><span>Nazwa banku:</span> {props.bankName}</p>
                    <p><span>Oddział:</span> {props.departueName}</p>
                </div>
            </div>
        </div>
    </div>
};


export default InfoPerNumber;