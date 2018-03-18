import { ICirnoApi } from './ICirnoApi';
import { IndexPageInfo } from '../models/IndexPageInfo';
import { ArticleInfo } from '../models/ArticleInfo';
import { Article } from '../models/Article';
import { AxiosResponse, default as axios } from 'axios';

export class CirnoApi implements ICirnoApi {

    private getApiEndpoint(): string {
        return 'http://localhost:57743';
    }

    private invokeMethod(
        method: string,
        api: string,
        data: any,
        onSuccess: (response: AxiosResponse) => void,
        onFailed: (error: any) => void) {
        axios(
            {
                method: method,
                url: this.getApiEndpoint().concat(api),
                data: data
            }
        ).then((response: AxiosResponse) => {
            onSuccess(response);
        })
        .catch((error: any) => {
            onFailed(error);
        });

    }
    public GetIndexPageInfo(
        before: () => void,
        success: (data: IndexPageInfo) => void,
        failed: (error: any) => void): void {
        if (before !== null) {
            before();
        }

        this.invokeMethod(
            'get',
            '/api/indexPageInfo',
            {},
            (response: AxiosResponse) => {
                success(response.data);
            },
            (error: any) => {
                failed(error);
            }
        );
    }

    public GetArticle(
        link: string,
        before: () => void,
        success: (data: Article) => void,
        failed: (error: any) => void): void {
        if (before !== null) {
            before();
        }

        this.invokeMethod(
            'get',
            '/api/article/' + link,
            {},
            (response: AxiosResponse) => {
                success(response.data.data.content);
            },
            (error: any) => {
                failed(error);
            }
        );
    }

    public GetArticleList(
        tag: string,
        maxCount: number,
        token: string,
        before: () => void,
        success: (data: ArticleInfo[], token: string) => void,
        failed: (error: any) => void): void {

        if (before !== null) {
            before();
        }

        this.invokeMethod(
            'get',
            '/api/articleInfo/' + tag + '?' + 'maxCount=' + maxCount,
            {},
            (response: AxiosResponse) => {
                success(response.data.data, response.data.continuationToken);
            },
            (error: any) => {
                failed(error);
            }
        );
    }
}
