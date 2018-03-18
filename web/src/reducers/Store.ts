import { combineReducers, createStore } from 'redux';
import { ArticleState, ArticleReducer } from './Article';
import { ArticleListState, ArticleListReducer } from './ArticleList';

export type Status = 'Init' | 'Loading' | 'Done' | 'Error';

export interface StoreState {
    article: ArticleState;
    articleList: ArticleListState;
}

export const CirnoApp = combineReducers<StoreState>({
    article: ArticleReducer,
    articleList: ArticleListReducer
});

export const CirnoStore = createStore<StoreState>(CirnoApp);