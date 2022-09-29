import { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, useParams } from 'react-router-dom';
import './projectDetails.css';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React from 'react';

// SprintBootLocal
// const API_URL = 'http://localhost:5005';
// SprintBoot Heroku
const API_URL = 'https://cresta-nanoworld-final-project.herokuapp.com';

function EditProject(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creator, setCreator] = useState('');
    const { projectId } = useParams();
    const [formShowing, setFormShowing] = useState(false);

    // const navigate = withRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        // GET request to get the project by id
        axios
            .get(`${API_URL}/api/projects/${projectId}`)
            .then((response) => {
                const oneProject = response.data;
                setTitle(oneProject.title);
                setDescription(oneProject.description);
                setCreator(oneProject.creator);

                props.refreshProject();
            })
            .catch((error) => console.log(error));
    }, [projectId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, creator };

        //PUT request to update the project
        axios
            .patch(`${API_URL}/api/projects/${projectId}`, requestBody)
            .then((response) => {
                setTitle('');
                setDescription('');
                setCreator('');
                withRouter('/projects/' + projectId);

                props.refreshProject();
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <React.Fragment>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Información del proyecto</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form className="projectUpdateForm" onSubmit={handleFormSubmit}>
                            <Row>
                                <Col md={12}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Creador</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="creator"
                                            value={creator}
                                            onChange={(e) => setCreator(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className="btn-block" color="primary" size="large" type="submit" variant="light">
                                Actualizar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </React.Fragment>
        </>
    );
}

export default EditProject;
