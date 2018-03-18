import { connect } from 'react-redux';
import { ArticleActions, ArticleState } from '../reducers/Article';
import { StoreState } from '../reducers/Store';
import * as reducer from '../reducers/Article';
import { ArticleComponentModel, ArticleComponentFunctions, ArticleComponentProps, ArticleComponent } from '../components/ArticleComponent';
import { Article } from '../models/Article';

export interface ArticleContainerOwnProps {
    link: string;
}

function mapDispatchToProps(dispatch: (action: ArticleActions) => void): ArticleComponentFunctions {
    return {
        onArticleLoaded: (article: Article) => dispatch(reducer.onArticleLoaded(article)),
        onArticleLoading: () => dispatch(reducer.onArticleLoading()),
        onArticleLoadingError: (error: string) => dispatch(reducer.onArticleLoadingError(error))
    };
}

function mapStateToProps(storeState: StoreState, ownProps: ArticleContainerOwnProps): ArticleComponentModel {
    let state: ArticleState = storeState.article;
    return {
        status: state.status,
        link: ownProps.link,
        article: state.article,
        error: state.error,
    };
}

export const ArticleContainer = connect(mapStateToProps, mapDispatchToProps)(ArticleComponent);