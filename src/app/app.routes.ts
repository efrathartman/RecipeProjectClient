import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Recipe } from './shared/models/recipe';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';

export const routes: Routes = [
    
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'allrecipe', component: AllRecipesComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

];
