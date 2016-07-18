import React from 'react';
import BackBtn from './back_btn';
const Header = ({
    title,
    has_back
}) => {
    let back = '';
    if (has_back) {
        back = <BackBtn />;
    }
    return (
        <header>
            {back}
            <h4>{title}</h4>
        </header>
    );
}
export default Header;