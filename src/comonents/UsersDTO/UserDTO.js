import React from 'react';

const User = props => {
  return (
      <div className="col-lg-12">
          <div>
              <img src="/images/user-icon.png" alt=""/>
              <p>{props.userName}</p>
          </div>
          <button><img src="/images/remove.png" alt=""/></button>
      </div>
  )
};

export default User;