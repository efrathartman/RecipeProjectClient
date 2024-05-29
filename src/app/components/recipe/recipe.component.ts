import { Component, Input, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Recipe } from '../../shared/models/recipe';


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

}
