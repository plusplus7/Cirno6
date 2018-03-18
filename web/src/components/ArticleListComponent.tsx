import * as React from 'react';
import { ArticleInfo } from '../models/ArticleInfo';
import { Status } from '../reducers/Store';
import { api } from '../services/CirnoServiceFactory';
import { Link } from 'react-router-dom';

export interface ArticleListComponentFunctions {
    onArticleListLoading(): void;
    onArticleListLoaded(articleList: ArticleInfo[], token: string): void;
    onArticleListLoadingError(error: string): void;
}

export interface ArticleListComponentModel {
    status: Status;
    tag: string;
    articleList: ArticleInfo[];
    token: string;
    error: string | null;
}

export type ArticleListComponentProps = ArticleListComponentFunctions & ArticleListComponentModel;

export class ArticleListComponent extends React.Component<ArticleListComponentProps> {
    private LoadArticleList(tag: string): void {
        api.GetArticleList(
            tag,
            5,
            null,
            () => this.props.onArticleListLoading(),
            (articleList: ArticleInfo[], token: string) => this.props.onArticleListLoaded(articleList, token),
            (error: string) => this.props.onArticleListLoadingError(error)
        );
    }

    public componentDidMount() {
        if (this.props.status === 'Init') {
            this.LoadArticleList(this.props.tag);
        }
    }

    public render() {
        console.log(this.props);
        if (this.props.status === 'Init' || this.props.status === 'Loading') {
            return <div>Loading...</div>;
        } else if (this.props.status === 'Done') {
            return (
                Array.from(this.props.articleList).map((articleInfo, index) => {
                    return (
                        <div>
                        <Link to={'/blog/' + articleInfo.link} >{articleInfo.content['content']['title']}</Link>
                        </div>);
        })
            );
        } else {
            return <div>Failed...</div>;
        }
    }
}