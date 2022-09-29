import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import { API_SERVER } from './../../../config/constant';
import { ACCOUNT_INITIALIZE } from './../../../store/actions';

const RestIris = ({ className, ...rest }) => {
    
    const [sepalLengthCm, setSepalLengthCm] = useState(0);
    const [sepalWidthCm, setSepalWidthCm] = useState(0);
    const [petalLengthCm, setPetalLengthCm] = useState(0);
    const [petalWidthCm, setPetalWidthCm] = useState(0);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([{}]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios
                .post(
                    API_SERVER + 'predictionIris',
                    {
                        sepalLengthCm,
                        sepalWidthCm,
                        petalLengthCm,
                        petalWidthCm
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
                    setResult(res);
                    console.log(res);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Iris Prediction</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="SepalLengthCm">
                                <Form.Label>Sepal LengthCm</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="sepalLengthCm"
                                    value={sepalLengthCm}
                                    onChange={(e) => setSepalLengthCm(e.target.value)}
                                    placeholder="Sepal LengthCm"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="SepalLengthCm">
                                <Form.Label>Petal LengthCm</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="petalLengthCm"
                                    value={petalLengthCm}
                                    onChange={(e) => setPetalLengthCm(e.target.value)}
                                    placeholder="Petal LengthCm"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group as={Col} controlId="SepalLengthCm">
                            <Form.Label>sepal WidthCm</Form.Label>
                            <Form.Control
                                required
                                autoComplete="off"
                                type="text"
                                name="sepalWidthCm"
                                value={sepalWidthCm}
                                onChange={(e) => setSepalWidthCm(e.target.value)}
                                placeholder="sepal WidthCm"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="SepalLengthCm">
                            <Form.Label>Petal WidthCm</Form.Label>
                            <Form.Control
                                required
                                autoComplete="off"
                                type="text"
                                name="petalWidthCm"
                                value={petalWidthCm}
                                onChange={(e) => setPetalWidthCm(e.target.value)}
                                placeholder="petal WidthCm"
                            />
                        </Form.Group>
                        <Button className="btn-block" color="primary" size="large" type="submit" variant="primary">
                            Summit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {!loading && (
                <div className="formItem">
                    <h1>{result.data}</h1>
                </div>
            )}
        </React.Fragment>
    );
};

export default RestIris;
