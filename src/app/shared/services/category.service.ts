import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http =inject(HttpClient)
  private categoryUrl=`${environment.apiURL}/categories`;
  getAllCategories()
  {
    console.log("hi");
    
     return this.http.get<Category[]>(this.categoryUrl)
  }
}
