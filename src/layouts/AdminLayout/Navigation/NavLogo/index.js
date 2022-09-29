import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import logo from '../../../../assets/logo/NanoPredicTorioLOGO.gif';

const NavLogo = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const { dispatch } = configContext;

    let toggleClass = ['mobile-menu'];
    if (collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <React.Fragment>
            <div className="navbar-brand header-logo">
                <Link to="#" className="b-brand">
                    <span
                        className="b-title"
                        style={{
                            margin: 5
                        }}
                    >
                        <img
                            src={logo}
                            style={{
                                width: 60,
                                height: 60,
                                padding: 6
                            }}
                            className="img-fluid rounded-circle"
                        />
                        NanoPredicTorio
                    </span>
                </Link>
            </div>
        </React.Fragment>
    );
};

export default NavLogo;
