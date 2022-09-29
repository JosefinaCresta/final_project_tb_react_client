import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import MathJax from 'react-mathjax';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import { API_SERVER } from '../../../config/constant';
import { ACCOUNT_INITIALIZE } from '../../../store/actions';

const SubDbModel = ({ className, ...rest }) => {
    const [nSurface, setNsurface] = useState(0);
    const [avgSurf, setAvgSurf] = useState(0);
    const [q6q6AvgSurf, setQ6q6AvgSurf] = useState(0);
    const [S100, setS100] = useState(0);
    const [S111, setS111] = useState(0);
    const [S110, setS110] = useState(0);
    const [S311, setS311] = useState(0);

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([{}]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios
                .post(
                    API_SERVER + 'modelsSubDB',
                    {
                        nSurface,
                        avgSurf,
                        q6q6AvgSurf,
                        S100,
                        S111,
                        S110,
                        S311
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                )
                .then((res) => {
                    setLoading(false);
                    setResult(res.data);
                    console.log(res);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Col sm={12}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">
                            Predicción de Energía Total de Nanopartículas a partir de sus Características Superficiales
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12}>
                                    <Form.Group controlId="exampleForm.RangeInput">
                                        <Form.Label htmlFor="customRange3">Cantidad de átomos superficiales</Form.Label>
                                        <RangeSlider
                                            min={200}
                                            max={4000}
                                            value={nSurface}
                                            onChange={(changeEvent) => setNsurface(changeEvent.target.value)}
                                        />
                                        <Form.Text className="text-muted">Se considera nano entre 200 y 4000 átomos (Au)</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>
                                                <a
                                                    target="_blank"
                                                    style={{ textDecoration: 'none' }}
                                                    href="https://en.wikipedia.org/wiki/Coordination_number"
                                                >
                                                    Número de coordinación promedio{' '}
                                                </a>
                                            </Form.Label>
                                            <FormControl
                                                as="select"
                                                aria-describedby="custom-addons1"
                                                className="custom-select"
                                                // placeholder="Seleccionar número de coordinación promedio de los átomos superficiales "
                                                value={avgSurf}
                                                onChange={(e) => setAvgSurf(e.target.value)}
                                            >
                                                <option>Avg_surf</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                            </FormControl>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>
                                                <a
                                                    target="_blank"
                                                    style={{ textDecoration: 'none' }}
                                                    href="http://www.rsc.org/suppdata/c8/nr/c8nr06450d/c8nr06450d1.pdf"
                                                >
                                                    Parámetro de orden promedio
                                                </a>
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                step="0.01"
                                                min="0.3"
                                                max="9.0"
                                                placeholder="Ingresar armónico esférico promedio para los átomos de superficie"
                                                name="q6q6_avg_surf"
                                                value={q6q6AvgSurf}
                                                onChange={(e) => setQ6q6AvgSurf(e.target.value)}
                                            />
                                            <MathJax.Provider>
                                                <Form.Text className="text-muted">
                                                    {' '}
                                                    <MathJax.Node inline formula={`0.2 > q6.q6 > 9.0`} />{' '}
                                                </Form.Text>
                                            </MathJax.Provider>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>
                                            <a
                                                target="_blank"
                                                style={{ textDecoration: 'none' }}
                                                href="https://pubs.acs.org/cms/10.1021/ja408645b/asset/images/large/ja-2013-08645b_0005.jpeg"
                                            >
                                                S_100
                                            </a>{' '}
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="# de átomos superficies [100]"
                                            min={0}
                                            max={2000}
                                            name="S_"
                                            value={S100}
                                            onChange={(e) => setS100(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label> S_111 </Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="# de átomos superficies [111]"
                                            min={0}
                                            max={2000}
                                            name="S_"
                                            value={S111}
                                            onChange={(e) => setS111(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label> S_110 </Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="# de átomos superficies [110]"
                                            min={0}
                                            max={2000}
                                            name="S_"
                                            value={S110}
                                            onChange={(e) => setS110(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>
                                            <a
                                                target="_blank"
                                                style={{ textDecoration: 'none' }}
                                                href="https://pubs.rsc.org/en/content/articlelanding/2021/cp/d1cp02629a"
                                            >
                                                S_311
                                            </a>
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="# de átomos superficies [311]"
                                            min={0}
                                            max={2000}
                                            name="S_"
                                            value={S311}
                                            onChange={(e) => setS311(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button className="btn-block" color="primary" size="large" type="submit" variant="primary">
                                Summit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>

            {!loading && (
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Datos Predicción</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>Energía potencial total de una nanoparticula <br/> con las características superficiales ingresada:</h5>

                                <MathJax.Provider>
                                    <h4>
                                        {result['prediction']} <MathJax.Node inline formula={`\\pm`} /> {result['rmse']} eV
                                    </h4>
                                </MathJax.Provider>
                                <p>Error porcentual {result['mape']} %</p>
                                <p>Con modelo {result['model']}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </React.Fragment>
    );
};

export default SubDbModel;
