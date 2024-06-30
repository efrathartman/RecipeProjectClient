import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Recipe } from './shared/models/recipe';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { inject } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { authGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
    
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'allrecipe', component: AllRecipesComponent },
    { path: '', component: AllRecipesComponent },
    { path: 'myRecipes', component: AllRecipesComponent },
    { path: 'recipeform', component: RecipeFormComponent,canActivate:[authGuard] },
    { path: 'recipeDetails/:id', component: RecipeDetailsComponent },

];
