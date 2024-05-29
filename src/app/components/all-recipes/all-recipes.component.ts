import { Component, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { RecipeComponent } from '../recipe/recipe.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [RecipeComponent,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit{
 
private categoryService=inject(CategoryService)
  private recipeService = inject(RecipeService);
  list: any[] = [];
  categories: Category[] = [];
  findCategory(x:string |undefined)
  {
    this.list=this.list.find(x=>x.categories.categoryName==x) 
    return this.list;
  }
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.list = data as any[];
      console.log(data);
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data as any[];
      console.log(data);
    });
  }
}
