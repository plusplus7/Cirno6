import * as React from 'react';
import { Article } from '../models/Article';
import { Status } from '../reducers/Store';
import { api } from '../services/CirnoServiceFactory';

export interface ArticleComponentFunctions {
    onArticleLoading(): void;
    onArticleLoaded(article: Article): void;
    onArticleLoadingError(error: string): void;
}

export interface ArticleComponentModel {
    status: Status;
    link: string;
    article: Article | null;
    error: string | null;
}

export type ArticleComponentProps = ArticleComponentFunctions & ArticleComponentModel;

export class ArticleComponent extends React.Component<ArticleComponentProps> {
    private LoadArticle(link: string): void {
        api.GetArticle(link,
            () => this.props.onArticleLoading(),
            (article: Article) => this.props.onArticleLoaded(article),
            (error: string) => this.props.onArticleLoadingError(error)
        );
    }

    public componentDidMount() {
        if (this.props.status === 'Init' || (this.props.article !== null && this.props.link !== this.props.article.link)) {
            this.LoadArticle(this.props.link);
        }
    }

    public render() {
        if (this.props.status === 'Init' || this.props.status === 'Loading') {
            return <div>Loading...</div>;
        } else if (this.props.status === 'Done') {
            return (
                <div>{JSON.stringify(this.props.article)}</div>
            );
        } else {
            return <div>Failed...</div>;
        }
    }
}