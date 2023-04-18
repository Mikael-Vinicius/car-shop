import React from "react";

import headerImg from '../images/cabecalho.png'

const Header = () => {
    return(
        <div className="image-container">
            <img className="image" src={headerImg} />
        </div>
    )
}

export default Header