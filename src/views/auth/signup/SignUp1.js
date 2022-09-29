import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo/NanoPredicTorioLOGO.gif';

import RestRegister from './RestRegister';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const SignUp1 = () => {
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
                    <Card className="borderless">
                        <Row className="align-items-center">
                            <Col>
                                <Card.Body className="text-center">
                                    <h4 className="mb-4">Bienvenidos a NanoPredicTorio</h4>
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
                                    <RestRegister />

                                    <p className="mb-2">
                                        Already have an account?{' '}
                                        <NavLink to="/auth/signin" className="f-w-400">
                                            Login
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
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignUp1;
