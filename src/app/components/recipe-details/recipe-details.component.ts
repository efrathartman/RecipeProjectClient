import { HttpParams } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { PreparationTimePipe } from '../../shared/pipe/preparation-time.pipe';
import { StarDirective } from '../../shared/directive/star.directive';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [PreparationTimePipe,StarDirective,MatDividerModule,MatCardModule,MatButtonModule,MatIcon,MatListModule,MatCardModule,CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
  
})
export class RecipeDetailsComponent implements OnInit{
  id:number|undefined
  isEnabaled:boolean=false;
  foundRecipe:Recipe={}
  newuser:any={}
  
   starList:number[] = [];
  constructor(private route: ActivatedRoute,private router:Router) { 
    this.id = this.route.snapshot.params['id'];
    console.log(this.id,"eee");
    
  }

  private recipeService=inject(RecipeService)
 public userService=inject(UserService)
 private snackBar = inject(MatSnackBar);
 hide=true
 clickEvent(event: MouseEvent) {
   this.hide = !this.hide;
   event.stopPropagation();
 }
  ngOnInit()
  {
    
    this.recipeService.getDetailsById(this.id).subscribe((recipes) => {
      console.log(recipes.timeOfMinutes,"rec");
      this.foundRecipe=recipes
      this.newuser=this.foundRecipe.userName;
      console.log(this.newuser[0]?._id,"soshi");
      console.log(this.foundRecipe.img,"img");
      
      console.log(this.foundRecipe,"recfo");
     this.userService.isEnabelad().subscribe((data)=>{
     console.log(data,"dataer");
     console.log(this.newuser[0]?._id,"dater2");
    const x=data.userId;
     console.log(x,"pop");

    //  console.log(this.foundRecipe.userName?.id,"dataer2");
    if(data.userId==this.newuser[0]?._id)
      {
        console.log(data,"yes");
        this.isEnabaled=true;
      }
      else{
        console.log("no");
        
      }
  })
  // this.userService.isEnabelad().subscribe((data) => {
  //   const userId = data ? data.toString().trim() : '';
  //   const recipeUserId = this.foundRecipe.userName?.id ? this.foundRecipe.userName.id.toString().trim() : '';
  
  //   console.log(`data type: ${typeof data}, value: ${userId}`);
  //   console.log(`foundRecipe.userName?.id type: ${typeof this.foundRecipe.userName?.id}, value: ${recipeUserId}`);
    
  //   if (userId === recipeUserId) {
  //     console.log(data, "yes");
  //   } else {
  //     console.log("no",userId);
  //   }
  // });
  
  

      // this.userService.isEnabelad().subscribe((data)=>{
      //  if(data==this.foundRecipe.userName?.id )
      //   {
      //     this.isEnabaled=true;
      //   }
        
      // })


      // this.list=recipes;
  });
  }
  deleteRecipe(id:number|undefined)
  {
  console.log("deleter",id);
  
  this.recipeService.deleteRecipe(id).subscribe(
    response => {
      console.log('Recipe deleted successfully', response); 
        this.openSnackBar('!המתכון הוסר בהצלחה', 'סגור');
        this.router.navigate(['/allrecipe']);
    },
    error => {
      console.error('Error deleting recipe', error);
    }
  );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000, 
    });
  }

}
