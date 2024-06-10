import { HttpParams } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { PreparationTimePipe } from '../../shared/pipe/preparation-time.pipe';
import { StarDirective } from '../../shared/directive/star.directive';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [PreparationTimePipe,StarDirective,MatDividerModule,MatCardModule,MatButtonModule,MatIcon,MatListModule,MatCardModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
  
})
export class RecipeDetailsComponent implements OnInit{
  id:number|undefined
  foundRecipe:Recipe={}
   starList:number[] = [];
  constructor(private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['id'];
    console.log(this.id,"eee");
    
  }

  private recipeService=inject(RecipeService)
  ngOnInit()
  {
    this.recipeService.getDetailsById(this.id).subscribe((recipes) => {
      console.log(recipes.timeOfMinutes,"rec");
      this.foundRecipe=recipes
      console.log(this.foundRecipe,"recfo");

      // this.list=recipes;
  });
  }
  deleteRecipe(id:number|undefined)
  {
  console.log("deleter",id);
  
      this.recipeService.deleteRecipe(id);
  }

  

}
