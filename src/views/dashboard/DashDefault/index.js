import React from 'react';
import { Row, Col, Card, Table, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

import AmChartEarnings from './chart/AmChartEarnings';
import AmChartStatistics6 from './chart/AmChartStatistics6';
import avatar1 from '../../../assets/logo/NanoPredicTorio_noback_y.png';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';

const DashDefault = () => {
    return (
        <React.Fragment>
            <Row>
                <div
                    class="card col-md-12 p-3"
                    style={{
                        backgroundColor: '#a9b7d0'
                        // width: '100px',
                        // height: '100px'
                    }}
                >
                    <div class="row ">
                        <div class="col-md-8">
                            <div class="card-block">
                                <h2
                                    className="mb-4"
                                    style={{
                                        color: '#3f4d67'
                                    }}
                                >
                                    Bienvenidos a NanoPredicTorio...
                                </h2>
                                <h5
                                    style={{
                                        textAlign: 'justify',
                                        color: 'white'
                                    }}
                                >
                                    Repositorio Institucional Universitario conectado con <br /> Centros de Investigación en Nanociencia y
                                    Nanotecnología <br /> potenciado con herramientas de Machine Learning <br /> para realizar Predicciones
                                    de Energía de Nanoestructuras Metálicas{' '}
                                </h5>
                                <br />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <img
                                src={avatar1}
                                style={{
                                    height: 300
                                }}
                                className="img-fluid "
                            />
                        </div>
                    </div>
                </div>
                {/* <Col md={4} xl={5}>
                    <Card>
                        <Card.Body></Card.Body>
                    </Card>
                </Col> */}

                <div class="card col-md-12 p-3">
                    <div class="row ">
                        <div class="col-md-8">
                            <div class="card-block">
                                <ReactPlayer url="https://www.youtube.com/watch?v=QorK2X7GsVU" playing controls volume="0.5" />
                            </div>
                        </div>
                        <div
                            class="col-md-4"
                            style={{
                                textAlign: 'justify',
                                marginTop: '30px',
                                width: '50px'
                            }}
                        >
                            <p
                                style={{
                                    textAlign: 'justify',
                                    marginLeft: '10px',
                                    marginRight: '15px',
                                    width: '300px'
                                }}
                            >
                                <b>Scientists</b> have realised that <b>tiny pieces</b> of this <b>precious metal </b>
                                -far too small to be seen by the naked eye- could also become a <b>valued commodity</b>. <br />
                                Around the world,
                                <b> gold nanoparticles</b> are being tested as components in <b>technology and medicines</b>.
                                <br />
                                Let <b>see</b>, <b>share</b> and <b>create</b> data about <b>nanoclusters and nanoparticles</b> here.
                                <br />
                                They cannot be perfectly monodispersed and present millions of possible configurations that modify the
                                potential energy of the nanoparticle.
                                <br />
                                This represents a <b>unique challenge</b> that can be solved with <b>machine learning methods</b>, taking
                                into account a greater number of descriptive characteristics of nanoparticles.{' '}
                            </p>
                        </div>
                    </div>
                </div>
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
