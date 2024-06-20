import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Recipe } from '../models/recipe';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http =inject(HttpClient)
  private recipeUrl=`${environment.apiURL}/recipes`;

  getAllRecipes(page:number=1,perPage:number=6,isFilter:boolean=false)
  {
    console.log(page,perPage);
    
    const params=new HttpParams()
    .set('page', page.toString())
    .set('perPage', perPage.toString());

    console.log("hi");
    console.log(this.http.get<Recipe[]>(this.recipeUrl));
    const url = `${this.recipeUrl}?page=${page}&perPage=${perPage}&isFilter=${isFilter}`;
     return this.http.get<Recipe[]>(url)
  }
  // getAllRecipesWithout(){
  //   return this.http.get<Recipe[]>(this.recipeUrl)
  // }
  getDetailsByTime(time: number) {
    return this.http.get<Recipe[]>(`${this.recipeUrl}/getDetailsByTime/${time}`);
  }

  public get token(): string | null {
    return localStorage.getItem('mytoken');
  }

  addRecipe(r: Recipe){
    console.log(r,"recipe");
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.post<Recipe>(`${this.recipeUrl}/addRecipe`,r,httpOptions);
  }
  getDetailsById(id: number |undefined) {
    return this.http.get<Recipe>(`${this.recipeUrl}/${id}`);
  }

  deleteRecipe(id:number|undefined)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    console.log("del",id); 
    return this.http.delete(`${this.recipeUrl}/${id}`,httpOptions)
   
  }
  getRecipesByUseId(id:null|string)
  {
    console.log(id,"idef");
    
      return this.http.get<Recipe[]> (`${this.recipeUrl}/getRecipesByUseId/${id}`)
  }
  }


