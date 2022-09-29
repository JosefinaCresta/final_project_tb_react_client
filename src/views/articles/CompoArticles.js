import { DataGrid } from '@material-ui/data-grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import IsLoading from '../../components/IsLoading/IsLoading';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import google from '../../assets/images/googleAcademico.png';
import React, { Component, lazy, Suspense } from 'react';

// flask
import { API_SERVER } from '../../config/constant';

function Articles() {
    const [isLoading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const getAllArticles = () => {
        axios
            .get(API_SERVER + 'articles')
            .then((response) => {
                setArticles(response.data['resultData'][0]['rowData']);
                setLoading(false);
                console.log('ResposSE', response.data['resultData'][0]['rowData']);
                console.log('articles', articles);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllArticles();
    }, []);

    const columns = [
        {
            field: 'PaperTitle',
            headerName: 'Titulo',
            flex: 1,
            cellClassName: 'projectListBody Vip',
            headerClassName: 'projectListHeader'
        },
        {
            field: 'Author',
            headerName: 'Autor',
            width: 150,
            cellClassName: 'projectListBody Vip',
            headerClassName: 'projectListHeader'
        },
        {
            field: 'Year',
            headerName: 'Año',
            width: 130,
            cellClassName: 'projectListBody Vip',
            headerClassName: 'projectListHeader'
        },
        {
            field: 'Publication',
            headerName: 'Editor',
            width: 200,
            cellClassName: 'projectListBody',
            headerClassName: 'projectListHeader'
        },
        {
            field: 'Url',
            headerName: 'Url',
            width: 150,
            headerClassName: 'projectListHeader',
            renderCell: (articles) => {
                return (
                    <>
                        {console.log('articles.row.url', articles.row.url)}
                        <a href={articles.row.Url} target="_blank" rel="noopener noreferrer">
                            <Button>Leer Más</Button>
                        </a>
                    </>
                );
            }
        }
    ];

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
                        <Card.Header style={{ justifyContent: 'center', display: 'flex' }}>
                            <img
                                src={google}
                                style={{
                                    height: 300,
                                    alignSelf: 'center'
                                }}
                                className="img-fluid "
                            />
                        </Card.Header>
                        <Card.Body>
                            <p>{articles.rows}</p>
                            <DataGrid
                                rows={articles}
                                disableSelectionOnClick
                                columns={columns}
                                autoHeight="true"
                                autoPageSize
                                rowsPerPageOptions={[5, 10, 20]}
                                getEstimatedRowHeight={() => 200}
                            />
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
}

export default Articles;
