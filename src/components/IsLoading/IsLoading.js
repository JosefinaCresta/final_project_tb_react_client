import React from 'react';
import { Col, Row } from 'react-bootstrap';
import gif from '../../assets/nanoparticle2.gif';
import './IsLoading.css';
export default function IsLoading() {
    return (
        <div className="home" id="main">
            <Row className="justify-content-md-center">
                <Col xs={12} sm={4} md={4}>
                    <img src={gif} alt="loadingGif" className="imgLoading" />
                    <div class="loading-text">
                        <span className="loading-text-words">L</span>
                        <span className="loading-text-words">O</span>
                        <span className="loading-text-words">A</span>
                        <span className="loading-text-words">D</span>
                        <span className="loading-text-words">I</span>
                        <span className="loading-text-words">N</span>
                        <span className="loading-text-words">G...</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
