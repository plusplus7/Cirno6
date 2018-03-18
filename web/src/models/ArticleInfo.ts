import { ArticleInfoContent } from './ArticleInfoContent';
export interface ArticleInfo {
    id: string;
    link: string;
    author: string;
    contentType: string;
    createDate: Date;
    content: ArticleInfoContent;
    tags: string[];
}