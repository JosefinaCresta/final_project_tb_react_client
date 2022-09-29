import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';
import MathJax from 'react-mathjax';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { API_SERVER } from '../../../config/constant';

const FulDbModel = () => {
    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([{}]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log('values: ', values);
        console.log('parsedData: ', parsedData);
        try {
            const response = await axios
                .post(
                    API_SERVER + 'modelsFullDB',
                    {
                        parsedData
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
                });
        } catch (error) {
            console.log(error);
        }
    };

    const [supportedFile, setSupportedFile] = useState(0);
    const supportedFileHandler = (event) => {
        setSupportedFile(!!event.target.value);
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Predicción de energía por átomo de nanoparticulas metálicas </Card.Title>
                            <p>
                                A partir de datos resultantes de simulaciones de dinámica molecular con
                                <a href="https://www.lammps.org/index.html#gsc.tab=0" target="_blank">
                                    LAMMPS
                                </a>
                            </p>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleOnSubmit}>
                                <div className="custom-file">
                                    <Form.Control
                                        className="custom-file-input"
                                        type={'file'}
                                        id={'csvFileInput'}
                                        accept={'.csv'}
                                        required
                                        isInvalid={!supportedFile}
                                        isValid={supportedFile}
                                        onChange={(event) => {
                                            supportedFileHandler(event);
                                            // Passing file data (event.target.files[0]) to parse using Papa.parse
                                            Papa.parse(event.target.files[0], {
                                                header: true,
                                                skipEmptyLines: true,
                                                complete: function (results) {
                                                    const rowsArray = [];
                                                    const valuesArray = [];

                                                    // Iterating data to get column name and their values
                                                    results.data.map((d) => {
                                                        rowsArray.push(Object.keys(d));
                                                        valuesArray.push(Object.values(d));
                                                    });

                                                    // Parsed Data Response in array format
                                                    setParsedData(results.data);

                                                    // Filtered Column Names
                                                    setTableRows(rowsArray[0]);

                                                    // Filtered Values
                                                    setValues(valuesArray);
                                                }
                                            });
                                        }}
                                    />
                                    <Form.Label className="custom-file-label" htmlFor="validatedCustomFile">
                                        Elegir archivo de datos...
                                    </Form.Label>
                                    {supportedFile ? '' : <div className="invalid-feedback">Formato invalido</div>}
                                </div>
                                <Button className="btn-block" color="primary" size="large" type="submit" variant="primary">
                                    Summit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* DATA INPUT LIST */}

            {!loading && (
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Datos ingresados</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 300,
                                        '& ul': { padding: 0 }
                                    }}
                                    subheader={<li />}
                                >
                                    {tableRows.map((rows, index) => (
                                        <li key={index}>
                                            <ul>
                                                <ListItem key={index}>
                                                    <ListItemText
                                                        classname="itemsDataInput"
                                                        primary={
                                                            // <Typography type="body2" style={{ color: '#FFFFFF' }}>
                                                            `${rows}:`
                                                            // </Typography>
                                                        }
                                                        secondary={`${values[0][index]}`}
                                                    />
                                                </ListItem>
                                            </ul>
                                        </li>
                                    ))}
                                </List>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Datos Predicción</Card.Title>
                            </Card.Header>
                            <Card.Body style={{ justifyContent: 'center' }}>
                                <h5>Energía potencial por átomo de la nanoparticula ingresada:</h5>
                                {console.log('modelOO', result['model'])}
                                {console.log('ResultadOO', result)}
                                <MathJax.Provider>
                                    <h4>
                                        {result['prediction']} <MathJax.Node inline formula={`\\pm`} /> {result['rmse']}eV
                                    </h4>
                                </MathJax.Provider>
                                <p>Error porcentual  {result['mape']} %</p>
                                <h5>Con modelo {result['model']}</h5>

                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </React.Fragment>
    );
};

export default FulDbModel;
