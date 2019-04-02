import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [new Recipe('Test Recipe', 'Test Description',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4KaZ5MO1e-wpUwC0AjULvPxFVPYvSPoMsV9gF2H7SLjKt8NBZ')];

  constructor() { }

  ngOnInit() {
  }

}
