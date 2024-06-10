import { Component, Input, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Recipe } from '../../shared/models/recipe';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  @Input('oneItem')
  recipe: Recipe = {}
  id:number | undefined
  constructor(private router:Router)
  {
    
  }
  moreDetails(id:number|undefined)
  {
    this.id=id;
    console.log(this.id,"id");
    this.router.navigate(['/recipeDetails',id]);
  }
 
}
