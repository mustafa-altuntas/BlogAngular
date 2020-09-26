import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Category } from '../models/category';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl:string = "https://localhost:44384/api/categories";

  constructor(private httpClient:HttpClient) { }

  public getCategories():Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.apiUrl);
  }

  public getCategorybyId(id:number):Observable<Category>{
    let url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Category>(url);
  }




}
