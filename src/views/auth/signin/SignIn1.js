import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo/NanoPredicTorioLOGO.gif';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

import RestLogin from './RestLogin';

const Signin1 = () => {
    return (
        <React.Fragment>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <Card className="borderless text-center">
                        <Card.Body>
                            <h4 className="mb-4">Welcome to NanoPredicTorio</h4>

                            <div className="mb-4">
                                <img
                                    src={logo}
                                    style={{
                                        width: 100,
                                        height: 100
                                    }}
                                    className="img-fluid rounded-circle"
                                />
                            </div>

                            <RestLogin />

                            <p className="mb-0 text-muted">
                                Don’t have an account?{' '}
                                <NavLink to="/auth/signup" className="f-w-400">
                                    Sign Up
                                </NavLink>
                            </p>

                            <br />
                            <Button href="https://nanopredictorio.my.canva.site/" target="_blank">
                                Presentación del producto
                            </Button>
                            <p className="mb-0 text-muted">
                                &copy;{' '}
                                <a target="_blank" href="https://www.linkedin.com/in/josefina-cresta/" rel="noreferrer">
                                    Josefina Cresta
                                </a>
                            </p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signin1;
