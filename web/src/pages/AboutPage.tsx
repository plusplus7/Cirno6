import * as React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export class AboutPage extends React.Component {
    public render() {
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col xs={4} md={0} />
                    <Col xs={4} md={12}>
                        <p>about</p>
                    </Col>
                    <Col xs={4} md={0} />
                </Row>
            </Grid>
        );
    }
}