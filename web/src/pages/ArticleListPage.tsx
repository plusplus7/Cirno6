import * as React from 'react';
import { ArticleListContainer } from '../containers/ArticleListContainer';
import { Grid, Row, Col } from 'react-bootstrap';

export class ArticleListPage extends React.Component {
    public render() {
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col xs={4} md={0} />
                    <Col xs={4} md={12} >
                        <ArticleListContainer tag={'Index'} />
                    </Col>
                    <Col xs={4} md={0} />
                </Row>
            </Grid>
        );
    }
}