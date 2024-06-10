import { CommonModule } from '@angular/common';
import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { from } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { User } from '../../shared/models/user';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,FormsModule, MatFormFieldModule, MatInputModule,MatSelectModule,MatCheckboxModule,MatButtonModule, MatDividerModule, MatIconModule,MatSnackBarModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit{
  recipeForm:FormGroup;
  private categoryService=inject(CategoryService)
  private recipeService=inject(RecipeService)
  private snackBar = inject(MatSnackBar);

  erroruser='';
  u:User={};
  hide=true
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  constructor(private fb:FormBuilder)
  {
    this.recipeForm=fb.group({
      recipename:fb.control('',[Validators.required,Validators.maxLength(20),Validators.minLength(2),Validators.pattern("^[a-zA-Zא-ת\\s]*$")]),
      description:fb.control('',[Validators.required,Validators.maxLength(100),Validators.pattern("^[a-zA-Zא-ת\\s]*$")]),
      timeOfMinutes:fb.control('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      level:fb.control('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      layersOfCake:fb.array([]),
      instructions:fb.control('',[Validators.required,Validators.pattern("^[a-zA-Z1-9א-ת\\s]*$"),Validators.maxLength(500)]),
      img:fb.control('',Validators.required),
      isPrivate:fb.control('',Validators.required),
      categories:fb.control('',Validators.required),
      newCategory:fb.control('',Validators.pattern("^[a-zA-Zא-ת\\s]*$"))
    })
    this.addLayer();

  }
  get layersCake(): FormArray {
    return this.recipeForm.controls['layersOfCake'] as FormArray;
  }
  getIngredients(layerIndex: number): FormArray {
    return (this.layersCake.at(layerIndex) as FormGroup).controls['ingredients'] as FormArray;
  }
  addLayer() {

    console.log("addLayer");
    this.layersCake.push(
      this.fb.group({
        description: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
        ingredients: this.fb.array([
          this.fb.control('', [Validators.required,Validators.pattern("^[a-zA-Z1-9א-ת\\s]+$")]),
        ]),
      })
    );

  }
  addingredient(layerIndex: number) {
    const ingredients = this.getIngredients(layerIndex);
    if (ingredients.at(ingredients.length - 1).value !== '') {
      ingredients.push(this.fb.control(''));
    }
 
  }
    addRecipe()
    { 
      this.recipeForm.value.layersOfCake.forEach((layer: any) => {
        const ingredients = layer.ingredients;

        for (let i = ingredients.length - 1; i >= 0; i--) {
          if (ingredients[i] === '') {
            ingredients.splice(i, 1); 
          }
        }
      });
      let objects: any[] = [];
      if(this.recipeForm.value.categories && this.recipeForm.value.newCategory)
      {
      this.recipeForm.value.categories.push(this.recipeForm.value.newCategory)
      console.log(this.recipeForm.value.categories,"נכנס!");
      }
      else{
        if(!this.recipeForm.value.categories)
          {
            this.recipeForm.value.categories=[];
            this.recipeForm.value.categories.push(this.recipeForm.value.newCategory)
            // this.recipeForm.value.categories=this.recipeForm.value.newCategory;
            console.log(this.recipeForm.value.categories,"מערך!");
          }
      }
    
 
      this.recipeForm.value.categories.forEach((item:any) => {
        let obj = { categoryName: item };
        objects.push(obj);
      });
      this.recipeForm.value.categories=objects;
     
     console.log( this.recipeForm.value.categories,"objects");

      console.log( this.recipeForm.value,"yghuji")
      this.recipeService
      .addRecipe({
      recipename:this.recipeForm.value.recipename,
      description:this.recipeForm.value.description,
      timeOfMinutes:this.recipeForm.value.timeOfMinutes,
      level:this.recipeForm.value.level,
      dataAdd:new Date(),
      layersOfCake:this.recipeForm.value.layersOfCake,
      instructions:this.recipeForm.value.instructions,
      img:this.recipeForm.value.img,
      isPrivate:this.recipeForm.value.isPrivate||false ,
      // userName:{id:"66662e9fefe0c204724007c6",userName:"shoshi"},
      categories:this.recipeForm.value.categories
    })
      .subscribe({
        next:(x)=>{
          console.log('add',x);
          this.openSnackBar('!המתכון הוסף בהצלחה', 'סגור');
  
    },
      error:(err)=>{
     console.error("fail",err)
     this.openSnackBar('שגיאה', 'סגור');
    }
  
    })
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 10000, 
      });
    }
  
    // toppings = new FormControl('');
   categoryList:Category[]=[]
   category = new FormControl('');


  ngOnInit(): void {
  
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categoryList = data as any[];
      console.log(data);
    });
  }
}
