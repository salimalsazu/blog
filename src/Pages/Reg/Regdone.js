import React from 'react';
import { Link } from 'react-router-dom';

const Regdone = () => {
    return (
        <div>
            <h1>Registraion Complete.Please  <Link to={"/login"} > <span>Log in</span> </Link> </h1>
        </div >
    );
};

export default Regdone; 