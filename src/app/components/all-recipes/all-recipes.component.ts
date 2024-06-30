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
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [RecipeComponent,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,MatPaginatorModule,MatGridListModule,MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit{
private userService=inject(UserService)
 private categoryService=inject(CategoryService)
  private recipeService = inject(RecipeService);
  currentRecipes: Recipe[] = [];
isVisible:boolean=true;
  currentPage: number = 1;
  perPage: number = 6;
  myRecipes:Recipe[]=[];
  recipes:Recipe[]=[];
  list: any[] = [];
 x:any={}
 y:string='';
 isMyRecipes:boolean=false;
  // list2: any[] = [];
  categories: Category[] = [];

  itsMy: boolean = false;
  selectedCategory: string | null=null;
  selectedLevel: number | null=null;
  selectedPrepTime: number|null=null;

  constructor(private route:ActivatedRoute)
  {

  }

  getStringValue(value: any): string {
    if (typeof value === 'string') {
      return value;
    } else {
      return value.toString();
    }
  }
  cancelFilter()
  {
    this.selectedCategory = null;
    this.selectedLevel = null;
    this.selectedPrepTime = null;
    this.isVisible = true;
    this.recipeService.getAllRecipes(this.currentPage, this.perPage).subscribe((data) => {
      this.currentRecipes = data;
      this.list = data as any[];
    
      console.log(data);
      });
      this.isVisible=true;
        return this.list;
        
  }
  PreperTime(time:number|null):void
  {
    this.isVisible=false;
    this.selectedPrepTime = time;
    this.applyFilters();
    //  this.recipeService.getDetailsByTime(time).subscribe((data)=>{
    //  this.currentRecipes=data as any[]; 
    //  })
    //  return this.currentRecipes
  }

  findCategory(category: string |null):void {
    this.isVisible=false;
    this.selectedCategory = category;
    this.applyFilters();
    // if(category===undefined)
    //   {
    //     return;
    //   }
      
  // console.log("קטגוריה:", category);
  // console.log("מתכונים לפני סינון:", this.currentRecipes);
  //     this.currentRecipes = this.currentRecipesWithout.filter(x => x.categories?.[0]?.categoryName == category);
  //   this.categoryService.getAllCategoryByRecipes(category).subscribe((data) => {
  //   this.recipes =  data?.recipesOfCategory as any ;
  //   this.currentRecipes=this.recipes;
  //   console.log(data.recipesOfCategory);
  //  })
  //  console.log(this.currentRecipes,"acshav");

  // this.recipeService.getAllRecipes(this.currentPage, this.perPage,true).subscribe((data) => {
  //   this.currentRecipes = data as any[];
  //   this.list = data as any[];
  //   this.currentRecipes=this.currentRecipes.filter(x=>x.categories?.[0].categoryName==category);
  //   console.log(data);
  //   });
  //     return this.list;
   }
 
  chooseOfLevel(y:number|null):void
  {
    this.isVisible=false;
    this.selectedLevel = y;
    this.applyFilters();
    // this.recipeService.getAllRecipes(this.currentPage, this.perPage,true).subscribe((data) => {
    // this.currentRecipes = data as any[];
    // this.list = data as any[];
    // this.currentRecipes=this.currentRecipes.filter(x=>x.level===y);
    // console.log(data);
    // });
    //   return this.list;
  }
  loadRecipes() {
    this.recipeService.getAllRecipes(this.currentPage, this.perPage).subscribe(recipes => {
        this.currentRecipes = recipes;
      
    });
}
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // MatPaginator משתמש באינדקס שמתחיל מ-0
    this.perPage = event.pageSize;
    this.loadRecipes();
}
applyFilters(): void {
  this.itsMy=true
  this.recipeService.getAllRecipes(this.currentPage,this.perPage,true).subscribe((data) => {
    this.currentRecipes = data.filter(recipe => {
      const matchesCategory = this.selectedCategory ? recipe.categories?.some(category => category.categoryName === this.selectedCategory) : true;
      const matchesTime = this.selectedPrepTime ? recipe.timeOfMinutes && recipe.timeOfMinutes <= this.selectedPrepTime : true;
      const matchesLevel = this.selectedLevel ? recipe.level === this.selectedLevel : true; 
      return matchesCategory && matchesTime && matchesLevel;
      
    });
  });
}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isMyRecipes = params['myRecipes'] === 'true';
    });
    this.loadRecipes();
    // this.recipeService.getAllRecipesWithout().subscribe((data) => {
    //   // this.list = data;
    //   this.currentRecipesWithout = data as any[];
    //   console.log(data,"efrat2");
    // });
    this.recipeService.getAllRecipes(this.currentPage, this.perPage).subscribe((data) => {
      // this.list = data;
      this.currentRecipes = data as any[];
      console.log(data,"efrat");
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data as any[];
      console.log(data);
    });
    this.userService.isEnabelad().subscribe((data)=>{
      console.log(data,"dataer");
      this.x=data.userId;
      this.y=this.x
      console.log(this.y.toString(),"y");
      console.log(this.x,"x"); 
     
    
    this.recipeService.getRecipesByUseId(this.y).subscribe((data)=>{
      console.log(this.userService.userid,"userid");
      
      this.myRecipes=data as any[]
      console.log(this.myRecipes,"my");
    })
    })
  }
  trackByRecipe(index: number, recipe: Recipe): string|number {
    return recipe._id ? recipe._id : `${index}`;
  }

}
