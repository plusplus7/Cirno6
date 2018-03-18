import { connect } from 'react-redux';
import { ArticleListActions, ArticleListState } from '../reducers/ArticleList';
import { StoreState } from '../reducers/Store';
import * as reducer from '../reducers/ArticleList';
import {
    ArticleListComponentModel,
    ArticleListComponentFunctions,
    ArticleListComponentProps,
    ArticleListComponent } from '../components/ArticleListComponent';
import { ArticleInfo } from '../models/ArticleInfo';

export interface ArticleListContainerOwnProps {
    tag: string;
}

function mapDispatchToProps(dispatch: (action: ArticleListActions) => void): ArticleListComponentFunctions {
    return {
        onArticleListLoading: () => dispatch(reducer.onArticleListLoading()),
        onArticleListLoaded: (articleList: ArticleInfo[], token: string) => dispatch(reducer.onArticleListLoaded(articleList, token)),
        onArticleListLoadingError: (error: string) => dispatch(reducer.onArticleListLoadingError(error))
    };
}

function mapStateToProps(storeState: StoreState, ownProps: ArticleListContainerOwnProps): ArticleListComponentModel {
    let state: ArticleListState = storeState.articleList;
    return {
        status: state.status,
        tag: ownProps.tag,
        articleList: state.articleList,
        token: state.continuationToken,
        error: state.error,
    };
}

export const ArticleListContainer = connect(mapStateToProps, mapDispatchToProps)(ArticleListComponent);