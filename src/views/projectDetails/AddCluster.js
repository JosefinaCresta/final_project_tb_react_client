// // src/components/AddCluster.js
import './projectDetails.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, useParams } from 'react-router-dom';

//Flask
import { API_SERVER, API_URL } from '../../config/constant';
import React from 'react';
import { Row, Col, Card, Form, Button, FormControl } from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import MathJax from 'react-mathjax';

function AddCluster(props) {
    const [formula, setFormula] = useState('');
    const [natoms, setNatoms] = useState(0);

    const [nSurface, setNsurface] = useState(0);
    const [avgSurf, setAvgSurf] = useState(0);
    const [q6q6AvgSurf, setQ6q6AvgSurf] = useState(0);
    const [S100, setS100] = useState(0);
    const [S111, setS111] = useState(0);
    const [S110, setS110] = useState(0);
    const [S311, setS311] = useState(0);

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [result, setResult] = useState([{}]);
    // const [energy, setEnergy] = useState(()=> result['prediction']);
    const [energy, setEnergy] = useState(0);

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

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const { projectId } = props;
        console.log('AfterSumit2', energy);
        // const requestBody = { formula, natoms, energy, forces, magmon, projectId };
        const requestBody = { energy, formula, natoms, projectId };

        try {
            const response2 = await axios.post(`${API_URL}/api/clusters`, requestBody).then((res) => {
                setEnergy('');
                setFormula("");
                setNatoms("");
               
                props.refreshProject();
            });
        } catch (error) {
            console.log(error);
        }
    };

  

     //UseEffect to map clusters and make array of needed data
     useEffect(() => {
        setEnergy(result['prediction']);
        setLoading2(false);
    }, [energy]);


    return (
        <React.Fragment>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Predicción de Energía</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Fórmula</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="formula"
                                        value={formula}
                                        onChange={(e) => setFormula(e.target.value)}
                                        placeholder="4Au"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>N atoms</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="natoms"
                                        value={natoms}
                                        onChange={(e) => setNatoms(e.target.value)}
                                        placeholder="N"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group controlId="exampleForm.RangeInput">
                                    <Form.Label htmlFor="customRange3">N_surface</Form.Label>
                                    <RangeSlider min={200} max={4000} value={nSurface} onChange={(e) => setNsurface(e.target.value)} />
                                    <Form.Text className="text-muted">Se considera nano entre 200 y 4000 átomos (Au)</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Avg_surf</Form.Label>
                                    <FormControl
                                        as="select"
                                        aria-describedby="custom-addons1"
                                        className="custom-select"
                                        // placeholder="Seleccionar número de coordinación promedio de los átomos superficiales "
                                        value={avgSurf}
                                        onChange={(e) => setAvgSurf(e.target.value)}
                                    >
                                        <option>Seleccionar número de coordinación promedio de los átomos superficiales</option>
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
                                            q6q6_Avg_Surf
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
                                    <Form.Label>S_311</Form.Label>
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
                        <Button className="btn-block" color="primary" size="large" type="submit" variant="primary" onClick={handleSubmit} >
                            Predecir Energía
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {!loading && (
                <Row>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Datos Prediccións</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <h3>Energía total: </h3>

                            <MathJax.Provider>
                                <h4>
                                    {result['prediction']} <MathJax.Node inline formula={`\\pm`} /> {result['rmse']} eV
                                </h4>
                            </MathJax.Provider>
                            <p>Error porcentual {result['mape']}</p>
                            <p>Con modelo {result['model']}</p>
                            <Button
                                className="btn-block"
                                color="primary"
                                size="large"
                                type="submit"
                                variant="primary"
                                onClick={handleSubmit2}
                            >
                                Submit
                            </Button>
                        </Card.Body>
                    </Card>
                </Row>
            )}
        </React.Fragment>
    );
}

export default AddCluster;

// // src/components/AddCluster.js

// import { useState } from 'react';
// import axios from 'axios';
// import './projectDetails.css';
// import { API_SERVER, API_URL } from '../../config/constant';
// // const API_URL = 'http://localhost:5005';

// function AddCluster(props) {
//     const [formula, setFormula] = useState('');
//     const [energy, setEnergy] = useState(0);
//     const [natoms, setNatoms] = useState(0);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const { projectId } = props;
//         // const requestBody = { formula, natoms, energy, forces, magmon, projectId };
//         const requestBody = { formula, natoms, energy, projectId };
//         const storedToken = localStorage.getItem('authToken');

//         axios
//             .post(`${API_URL}/api/clusters`, requestBody, {
//                 headers: { Authorization: `Bearer ${storedToken}` }
//             })
//             .then((response) => {
//                 setFormula('');
//                 setEnergy('');
//                 setNatoms('');
//                 props.refreshProject();
//             })
//             .catch((error) => console.log(error));
//     };

//     return (
//         <>
//             <form className="projectUpdateForm" onSubmit={handleSubmit}>
//                 {/* <div className="projectUpdateLeft"> */}
//                 <div className="formItem">
//                     <label>Formula:</label>
//                     <input type="text" name="formula" value={formula} onChange={(e) => setFormula(e.target.value)} />
//                 </div>
//                 <div className="formItem">
//                     <label>Number of Atoms:</label>
//                     <input type="number" name="natoms" value={natoms} onChange={(e) => setNatoms(e.target.value)} />
//                 </div>
//                 <div className="formItem">
//                     <label>Energy:</label>
//                     <input type="number" name="energy" value={energy} onChange={(e) => setEnergy(00000)} />
//                 </div>

//                 <button className="formButton" type="submit">
//                     Add Cluster
//                 </button>
//             </form>
//         </>
//     );
// }

// export default AddCluster;
