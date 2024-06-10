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
import { Observable, map } from 'rxjs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [RecipeComponent,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,MatPaginatorModule,MatGridListModule,MatCardModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit{

 private categoryService=inject(CategoryService)
  private recipeService = inject(RecipeService);
  currentRecipes: Recipe[] = [];
  currentPage: number = 1;
  perPage: number = 6;

  recipes:Recipe[]=[];
  list: any[] = [];
  // list2: any[] = [];
  categories: Category[] = [];
  cancelFilter()
  {
    this.recipeService.getAllRecipes(this.currentPage, this.perPage).subscribe((data) => {
      this.currentRecipes = data;
      this.list = data as any[];
    
      console.log(data);
      });
  
        return this.list;
  }
  PreperTime(time:number):Recipe[]
  {
     this.recipeService.getDetailsByTime(time).subscribe((data)=>{
     this.currentRecipes=data as any[]; 
     })
     return this.currentRecipes
  }

  findCategory(category: string |undefined) {
    if(category===undefined)
      {
        return;
      }
    this.categoryService.getAllCategoryByRecipes(category).subscribe((data) => {
    this.recipes =  data?.recipesOfCategory as any ;
    this.currentRecipes=this.recipes
    console.log(data.recipesOfCategory);
    })
  }
  chooseOfLevel(y:Number):Recipe[]
  {
    this.recipeService.getAllRecipes(this.currentPage, this.perPage).subscribe((data) => {
    this.currentRecipes = data as any[];
    this.list = data as any[];
    this.currentRecipes=this.currentRecipes.filter(x=>x.level===y);
    console.log(data);
    });
      return this.list;
  }
  loadRecipes() {
    this.recipeService.getAllRecipes(this.currentPage, this.perPage).subscribe(recipes => {
        this.currentRecipes = recipes;
        // this.list=recipes;
    });
}
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // MatPaginator משתמש באינדקס שמתחיל מ-0
    this.perPage = event.pageSize;
    this.loadRecipes();
}
  ngOnInit(): void {
    this.loadRecipes();
    this.recipeService.getAllRecipes(this.currentPage, this.perPage).subscribe((data) => {
      // this.list = data;
      this.currentRecipes = data as any[];
      console.log(data,"efrat");
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data as any[];
      console.log(data);
    });
  }
}
