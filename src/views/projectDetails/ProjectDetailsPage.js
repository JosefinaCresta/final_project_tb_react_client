import './projectDetails.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddCluster from './AddCluster';
import EditProject from './EditProject';
import FullCsv from './FullCsv';
import ClusterCard from '../../components/clusterCard/ClusterCard';
import { Row, Col, Card, Table, Button, Tabs, Tab, Nav } from 'react-bootstrap';

// SprintBootLocal
// const API_URL = 'http://localhost:5005';
// SprintBoot Heroku
const API_URL = 'https://cresta-nanoworld-final-project.herokuapp.com';

function ProjectDetailsPage(props) {
    const [project, setProject] = useState(null);
    const { projectId } = useParams();

    //GET to get project by Id
    const getProject = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/projects/${projectId}`)
            .then((response) => {
                const oneProject = response.data;
                setProject(oneProject);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProject();
        console.log(project);
    }, []);

    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <h5>Detalles del Projecto: </h5>
                                <div className="col d-flex justify-content-end">
                                    <Link to="/projects">
                                        <Button>Volver a Lista</Button>
                                    </Link>
                                </div>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body style={{ justifyContent: 'center', display: 'flex' }}>
                            {project && (
                                <Card style={{ width: '50%', marginLeft: '25px', alignitems: 'center' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>{project.title}</h3>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            Creado por: <b>{project.creator}</b>
                                            <br></br>
                                            <br></br>
                                            Descripción:
                                            <br></br>
                                            {project.description}
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Header style={{ height: '10rem' }}>
                            <Card.Title>Calculadora</Card.Title>{' '}
                            {project && (
                                <>
                                    <span>
                                        <Button variant="light" style={{ marginLeft: '5px', width: '10rem', height: '4rem' }}>
                                            <Link to={`/calculators/${project.calculator.id}`} className="link">
                                                <p>Id: {project.calculator.id}</p>
                                            </Link>
                                        </Button>
                                    </span>
                                </>
                            )}{' '}
                        </Card.Header>
                        <Card.Header>
                            <Card.Title>Nanopartículas</Card.Title>
                            <span> </span>
                            <div className="projectShowInfo">
                                <span />
                                {/* TARJETA CON DATOS CLUSTERS */}
                                {project && project.clusters.map((cluster) => <ClusterCard key={cluster.id} {...cluster} />)}
                            </div>
                        </Card.Header>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Tabs defaultActiveKey="home">
                        <Tab eventKey="home" title="Editar:">
                            <Card>
                                <Card.Body>
                                    <EditProject refreshProject={getProject} projectId={projectId} />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="Energía Total" title="Energía Total">
                            <Card>
                                <Card.Body>
                                    <AddCluster refreshProject={getProject} projectId={projectId} />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="contact" title="Energía/átomo">
                            <Card>
                                <Card.Body>
                                    <FullCsv refreshProject={getProject} projectId={projectId} />
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </React.Fragment>

        // <div className="projectList" id="main">
        //   <div className="projectTitleContainer">
        //     <h1 className="projectTitle">Detalles del Projecto</h1>

        //     <Link to="/projects">
        //       <button className="formButton">Back to projects</button>
        //     </Link>
        //   </div>

        //   <div className="projectContainer">
        //     {/* Project Show Details */}
        //     <div className="projectShow">
        //       <div className="projectShowTop">
        //         {/* Project Show Top Details */}
        //         {project && (
        //           <>
        //             <div className="projectShowTopTitle">
        //               <span className="projectShowprojectname">
        //                 {project.title}
        //               </span>
        //               <span className="projectShowprojectTitle">
        //                 Creado por: {project.creator}
        //               </span>
        //               <span className="projectShowprojectTitle">
        //                 {project.description}
        //               </span>
        //             </div>
        //           </>
        //         )}
        //       </div>

        //       <hr></hr>
        //       {/* Project Show Bottom Details */}
        //       {/* Calculator Details  */}

        //       <div className="projectShowBottom">
        //         <div className="projectTitleContainer cardscontainer">
        //           <div className="projectShowTitle">Calculadora: </div>
        //           {/* TARJETA CON DATOS CALCULADORA */}
        //           {project && (
        //             <>
        //               <span className="projectShowInfo">
        //                 <Link to={`/calculators/${project.calculator.id}`} className="link">
        //                   <h1 className="sidebarListItem ">Id: {project.calculator.id}</h1>
        //                 </Link>
        //               </span>
        //             </>
        //           )}
        //         </div>
        //         {/* Clusters Details */}
        //         <div className="projectTitleContainer cardscontainer">
        //           <span className="projectShowTitle">Nanoparticulas: </span>
        //           <div className="projectShowInfo">
        //             <span/>
        //             {/* TARJETA CON DATOS CLUSTERS */}
        //             {project &&
        //               project.clusters.map((cluster) => (
        //                 <ClusterCard key={cluster.id} {...cluster} />
        //               ))}
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     {/* Project Updates */}
        //     <div className="projectUpdate">

        //       {/* Edit Project Top Details */}
        //       {/* FORM UPDATE */}
        //       <div className="projectEditDetails">
        //         <span className="projectUpdateTitle">Editar Projecto</span>
        //         <EditProject refreshProject={getProject} projectId={projectId} />
        //       </div>
        //       {/* Add Cluster to projects */}
        //       {/* FORM ADD */}
        //       <div className="projectAddCluster">
        //         <span className="projectUpdateTitle">Agregar Partícula</span>
        //         <AddCluster refreshProject={getProject} projectId={projectId} />
        //       </div>
        //     </div>
        //   </div>
        // </div>
    );
}
export default ProjectDetailsPage;
