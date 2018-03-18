import { IndexPageInfo } from '../models/IndexPageInfo';
import { ArticleInfo } from '../models/ArticleInfo';
import { Article } from '../models/Article';

export interface ICirnoApi {
    GetIndexPageInfo(
        before: () => void,
        success: (data: IndexPageInfo) => void,
        failed: (error: any) => void): void;
    GetArticleList(
        tag: string,
        maxCount: number,
        token: string,
        before: () => void,
        success: (data: ArticleInfo[], token: string) => void,
        failed: (error: any) => void): void;
    GetArticle(
        link: string,
        before: () => void,
        success: (data: Article) => void,
        failed: (error: any) => void): void;
}
