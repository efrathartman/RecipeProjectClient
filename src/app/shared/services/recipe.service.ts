import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http =inject(HttpClient)
  private recipeUrl=`${environment.apiURL}/recipes`;

  getAllRecipes()
  {
    console.log("hi");
    
     return this.http.get<Recipe[]>(this.recipeUrl)
  }

}
