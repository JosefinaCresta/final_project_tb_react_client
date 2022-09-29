import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import IsLoading from '../../components/IsLoading/IsLoading';
import { Row, Col, Card, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

// SprintBootLocal
// const API_URL = 'http://localhost:5005';
// SprintBoot Heroku
const API_URL = 'https://cresta-nanoworld-final-project.herokuapp.com';

function ProjectListPage() {
    // UseStates and Variables
    const [isLoading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    //   const navigate = useNavigate();

    // GET request to get the projects
    const getAllProjects = () => {
        axios
            .get(`${API_URL}/api/projects`)
            .then((response) => {
                setProjects(response.data);
                setLoading(false);
                console.log('ResposSE', response.data);
                console.log('articles', projects);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllProjects();
    }, []);

    //DELETE request to delete the project
    const deleteProject = (id) => {
        const storedToken = localStorage.getItem('authToken');
        setLoading(true);
        axios
            .delete(`${API_URL}/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(() => {
                getAllProjects();
                Route('/projects');
            })
            .catch((err) => console.log(err));
    };
    const buttonVariants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            maxwidth: 10,
            cellClassName: 'projectListBody',
            headerClassName: 'projectListHeader'
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
            cellClassName: 'projectListBody Vip',
            headerClassName: 'projectListHeader'
        },
        {
            field: 'creator',
            headerName: 'Creator',
            width: 200,
            cellClassName: 'projectListBody Vip',
            headerClassName: 'projectListHeader'
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 600,
            flex: 1,
            cellClassName: 'projectListBody',
            headerClassName: 'projectListHeader'
        },
        {
            field: '  ',
            headerName: '  ',
            width: 150,
            headerClassName: 'projectListHeader',
            renderCell: (projects) => {
                return (
                    <>
                        <Link to={'./projects/' + projects.row.id}>
                            {/* <Button className={'text-capitalize btn-glow-warning'} variant={'warning'}> */}
                            <div class="col border-end  d-flex justify-content-center align-items-center">
                                <Button>See More</Button>
                            </div>
                        </Link>
                    </>
                );
            }
        },
        {
            field: '    ',
            headerName: '    ',
            width: 20,
            headerClassName: 'projectListHeader',
            renderCell: (projects) => {
                return (
                    <>
                        <DeleteOutline
                            className="projectListDelete"
                            //onClick={() => handleDelete(projects.row.id)}
                            onClick={() => deleteProject(projects.row.id)}
                        />
                    </>
                );
            }
        }
    ];

    // ///////////////////////////////////////////////////////

    return (
        <div className="projectList" id="main">
            {isLoading && (
                <>
                    <p>
                        <IsLoading />
                    </p>
                </>
            )}
            {!isLoading && (
                <>

                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <h3
                                    className="mb-4"
                                    style={{
                                        color: '#3f4d67'
                                    }}
                                >
                                    Repositorio Académico:{' '}
                                </h3>
                                <h5>Proyectos de simulaciónes, calculos y predicciónes sobre nanopartículas metálicas </h5>
                                <div className="col d-flex justify-content-end">
                                    <Button>Crear nuevo</Button>
                                </div>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <DataGrid
                                rows={projects}
                                disableSelectionOnClick
                                columns={columns}
                                autoHeight
                                getEstimatedRowHeight={() => 200}
                            />
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
}

export default ProjectListPage;
