import * as React from 'react';
import { NavbarComponent } from '../components/Navbar/NavbarComponent';
import { Switch, Route, Link } from 'react-router-dom';
import { ArticleListPage } from './ArticleListPage';
import { ArticlePage } from './ArticlePage';
import { Grid, Row, Col } from 'react-bootstrap';
import { AboutPage } from './AboutPage';

export class AppPage extends React.Component {
    public render() {
        return (
            <div>
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={4} md={0} />
                        <Col xs={4} md={12}>
                            <NavbarComponent />
                        </Col>
                        <Col xs={4} md={0} />
                    </Row>
                </Grid>
                <Switch>
                    <Route exact path='/blog' render={() => <ArticleListPage />} />
                    <Route path='/blog/:key' render={(props) => <ArticlePage link={props.match.params.key} />} />
                    <Route path='/about' render={() => <AboutPage />} />
                </Switch>
            </div>

        );
    }
}