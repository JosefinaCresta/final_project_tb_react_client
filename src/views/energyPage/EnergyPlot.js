import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
// import faker from "faker";
import { Bubble } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import LineChart from './LineChart';
// SprintBootLocal
// const API_URL = 'http://localhost:5005';
// SprintBoot Heroku
const API_URL = 'https://cresta-nanoworld-final-project.herokuapp.com';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
    scales: {
        xAxes:{
          title: {
              display: true,
              text: 'Cantidad de átomos',
              font: {
                  size: 15
              }
          }
      },
        yAxes: {
          title: {
              display: true,
              text: 'Energía [eV]',
              font: {
                  size: 15
              }
          }
      },
    }
};

export default function EnergyPlot() {
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clusterDataSet, setClusterDataSet] = useState([]);

    // GET request to get the clusters
    const getAllclusters = () => {
        axios
            .get(`${API_URL}/api/clusters`)
            .then((response) => {
                setClusters(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllclusters();
    }, []);

    //UseEffect to map clusters and make array of needed data
    useEffect(() => {
        let tempObjArray = [];
        let tooltip = {};
        tempObjArray = clusters.map((cluster) => ({
            x: cluster.natoms,
            y: cluster.energyAtom,
            pointRadius: 20,
            fill: false,
            pointHoverRadius: 80
        }));
        tooltip = clusters.map((cluster) => ({
            callbacks: {
                title: function (context) {
                    return `AU${cluster.natoms}`;
                }
            }
        }));
        setClusterDataSet(tempObjArray);
        setLoading(false);
    }, [clusters]);

    return (
        <React.Fragment>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Gráfico de Energías</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="home" id="main">
                                <div className="logo ">Energía por átomo Vs cantidad de átomos que conforman la nanoestructura.</div>
                                <br></br>
                                {!loading && (
                                    <Bubble
                                        options={options}
                                        data={{
                                            datasets: [
                                                {
                                                    label: 'Nanoparticulas',
                                                    data: clusterDataSet,
                                                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                                                }
                                            ]
                                        }}
                                    />
                                )}
                                {loading && <></>}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
