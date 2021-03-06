import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ArticlePg } from '../models/article-pg';
import { tap, catchError } from 'rxjs/operators';
import { Article } from '../models/article';
import { Archive } from '../models/archive';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}
  public loading: boolean = true;
  private apiUrl: string = 'https://localhost:44384/api/articles';

  getArticlesWithoutPg(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.apiUrl);
  }

  public getAeticles(page: number, pageSize: number): Observable<ArticlePg> {
    let url = `${this.apiUrl}/${page}/${pageSize}`;

    return this.httpClient.get<ArticlePg>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }

  public getArticle(id: number): Observable<Article> {
    let url = `${this.apiUrl}/${id}`;

    return this.httpClient.get<Article>(url);
  }

  public getSearchArticles(
    searchTex: string,
    page: number,
    pageSize: number
  ): Observable<ArticlePg> {
    let url = `${this.apiUrl}/SearchArticles/${searchTex}/${page}/${pageSize}`;
    return this.httpClient.get<ArticlePg>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }

  public getArticlesWithCategory(
    categoryId: number,
    page: number,
    pagesize: number
  ): Observable<ArticlePg> {
    let url = `${this.apiUrl}/GetArticlesWithCategory/${categoryId}/${page}/${pagesize}`;
    return this.httpClient.get<ArticlePg>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }

  public getArticlesByMostView(): Observable<Article[]> {
    let url = `${this.apiUrl}/GetArticlesByMostView`;
    return this.httpClient.get<Article[]>(url);
  }

  getArticlesArchive(): Observable<Archive[]> {
    let url = `${this.apiUrl}/GetArticlesArchive`;
    return this.httpClient.get<Archive[]>(url);
  }

  getArticleArchiveList(
    year: number,
    month: number,
    page: number,
    pageSize: number
  ): Observable<ArticlePg> {
    let url = `${this.apiUrl}/GetArticleArchiveList/${year}/${month}/${page}/${pageSize}`;
    return this.httpClient.get<ArticlePg>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }

  articleViewCountUp(id: number) {
    let url = `${this.apiUrl}/ArticleViewCountUp/${id}`;
    return this.httpClient.get(url);
  }

  saveArticlePicture(image): Observable<any> {
    let url = `${this.apiUrl}/SaveArticlePicture`;

    return this.httpClient.post<any>(url, image);
  }


  addArticle(article:Article):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl,article);
  }





  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
