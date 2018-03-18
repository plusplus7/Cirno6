import { Reducer } from 'redux';
import { Status } from './Store';
import { Article } from '../models/Article';

export interface ArticleState {
    status: Status;
    article: Article | null;
    error: string | null;
}

export interface ArticleLoading {
    type: 'ARTICLE_LOADING';
}

export function onArticleLoading(): ArticleLoading {
    return {
        type: 'ARTICLE_LOADING'
    };
}

export interface ArticleLoaded {
    type: 'ARTICLE_LOADED';
    article: Article;
}

export function onArticleLoaded(article: Article): ArticleLoaded {
    return {
        type: 'ARTICLE_LOADED',
        article: article
    };
}

export interface ArticleLoadingError {
    type: 'ARTICLE_LOADING_ERROR';
    error: string;
}

export function onArticleLoadingError(error: string): ArticleLoadingError {
    return {
        type: 'ARTICLE_LOADING_ERROR',
        error: error,
    };
}

const defaultState: ArticleState = {
    status: 'Init',
    article: null,
    error: null,
};

export type ArticleActions = ArticleLoading | ArticleLoaded | ArticleLoadingError;

export const ArticleReducer: Reducer<ArticleState> = (state: ArticleState, action: ArticleActions) => {
    let next = state === undefined ? defaultState :  { ...state };

    switch (action.type) {
        case 'ARTICLE_LOADING':
            next.status = 'Loading';
            return next;

        case 'ARTICLE_LOADED':
            next.status = 'Done';
            next.article = action.article;
            return next;

        case 'ARTICLE_LOADING_ERROR':
            next.status = 'Error';
            next.error = action.error;
            return next;
    }

    return next || defaultState;
};