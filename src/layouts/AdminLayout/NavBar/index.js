import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import NavLeft from './NavLeft';
import NavRight from './NavRight';

import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';

const NavBar = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const { dispatch } = configContext;

    let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', 'navbar-default'];

    let toggleClass = ['mobile-menu'];
    if (collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    const navToggleHandler = () => {
        dispatch({ type: actionType.COLLAPSE_MENU });
    };

    let collapseClass = ['collapse navbar-collapse'];

    let navBar = (
        <React.Fragment>
            <div className="m-header">
                <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={navToggleHandler}>
                    <span />
                </Link>
                <Link to="#" className="b-brand">
                    <div className="b-bg">
                        <i src="https://i.pinimg.com/originals/49/e5/66/49e5662ed44056e92920cf8d66033de5.jpg" alt="" />
                        {/* <i className="feather icon-trending-up" /> */}
                    </div>
                    <span className="b-title">NanoPredicTorio</span>
                </Link>
            </div>
            <div className={collapseClass.join(' ')}>
                <NavLeft />
                <NavRight />
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <header className={headerClass.join(' ')}>{navBar}</header>
        </React.Fragment>
    );
};

export default NavBar;
