import * as React from 'react';
import { ArticleContainer } from '../containers/ArticleContainer';
import { Grid, Row, Col } from 'react-bootstrap';

interface ArticlePageProps {
    link: string;
}

export class ArticlePage extends React.Component<ArticlePageProps> {
    public render() {
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col xs={4} md={0} />
                    <Col xs={4} md={12} >
                        <ArticleContainer link={this.props.link} />
                    </Col>
                    <Col xs={4} md={0} />
                </Row>
            </Grid>
        );
    }
}