import React from 'react';

import './InfoPer.css'

const InfoPerNumber = props => {
    return <div className="info-per-wrapper">
        <div className="wrapper-information">
            <p><span>Nazwa banku:</span> {props.bankName}</p>
            <div>
                <p><span>Oddział:</span></p>
                <p>
                    {props.outpost} <br/>
                    {props.address} <br/>
                    {props.postal} <br/>
                    {props.phone}
                </p>
            </div>
        </div>
    </div>
};


export default InfoPerNumber;