import React from 'react';

import './UserDTO.css'

const User = props => {
    return (
        <div className="col-lg-12 userDTO">
            <div>
                <img src="/images/user-icon.png" alt=""/>
                <p onClick={() => props.showDTOUser(props.userName)}><span>Username:</span> {props.userName}</p>
            </div>
            <button onClick={() => props.removeUser(props.userName)}><img src="/images/remove.png" alt=""/></button>
        </div>
    )
};

export default User;