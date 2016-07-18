import React from 'react';

const BackBtn = () => (
    <a className="back-btn" onClick={()=>window.history.back(-1)}></a>
);
export default BackBtn;