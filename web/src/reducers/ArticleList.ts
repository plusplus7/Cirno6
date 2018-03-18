import { Reducer } from 'redux';
import { Status } from './Store';
import { ArticleInfo } from '../models/ArticleInfo';

export interface ArticleListState {
    status: Status;
    articleList: ArticleInfo[];
    continuationToken: string;
    error: string;
}

export interface ArticleListLoading {
    type: 'ARTICLE_LIST_LOADING';
}

export function onArticleListLoading(): ArticleListLoading {
    return {
        type: 'ARTICLE_LIST_LOADING'
    };
}

export interface ArticleListLoaded {
    type: 'ARTICLE_LIST_LOADED';
    articleList: ArticleInfo[];
    continuationToken: string;
}

export function onArticleListLoaded(articleList: ArticleInfo[], continuationToken: string): ArticleListLoaded {
    return {
        type: 'ARTICLE_LIST_LOADED',
        articleList: articleList,
        continuationToken: continuationToken
    };
}

export interface ArticleListLoadingError {
    type: 'ARTICLE_LIST_LOADING_ERROR';
    error: string;
}

export function onArticleListLoadingError(error: string): ArticleListLoadingError {
    return {
        type: 'ARTICLE_LIST_LOADING_ERROR',
        error: error,
    };
}

const defaultState: ArticleListState = {
    status: 'Init',
    articleList: [],
    continuationToken: '',
    error: null,
};

export type ArticleListActions = ArticleListLoading | ArticleListLoaded | ArticleListLoadingError;

export const ArticleListReducer: Reducer<ArticleListState> = (state: ArticleListState, action: ArticleListActions) => {
    let next = state === undefined ? defaultState :  { ...state };

    switch (action.type) {
        case 'ARTICLE_LIST_LOADING':
            next.status = 'Loading';
            return next;

        case 'ARTICLE_LIST_LOADED':
            next.status = 'Done';
            next.articleList = action.articleList;
            next.continuationToken = action.continuationToken;
            return next;

        case 'ARTICLE_LIST_LOADING_ERROR':
            next.status = 'Error';
            next.error = action.error;
            return next;
    }

    return next || defaultState;
};