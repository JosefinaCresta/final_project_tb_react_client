import './clusterCard.css';
import { Row, Col, Card, Form, Button, FormControl } from 'react-bootstrap';

function ClusterCard({ config, energy, formula, mag}) {
    return (
        // <div className="ClusterCard1">
        //   <h3>{formula}</h3>
        //   <hr></hr>
        //   <div className="clusterInfo">
        //     <h4>Energy:</h4>
        //     <p>{energy}</p>
        //   </div>
        //   <div className="clusterInfo">
        //   </div>
        // </div>
        <Card>
            <Card.Header as="h5">
                <span>{formula}</span>
            </Card.Header>
            <Card.Body>
            <Card.Title>Energía:</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <span>{energy}</span>
                </Card.Subtitle>
            {/* <Card.Title>Magnetización:</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <span>{mag}</span>
                </Card.Subtitle>
                <Card.Title>Configuración:</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <span>{config}</span>
                </Card.Subtitle> */}
            </Card.Body>
        </Card>
    );
}

export default ClusterCard;
