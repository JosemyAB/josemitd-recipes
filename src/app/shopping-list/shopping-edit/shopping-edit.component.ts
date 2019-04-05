import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../common/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    const formValue = form.value
    const newIngr = new Ingredient(formValue.name, formValue.amount);
    console.log(newIngr);
    this.shoppingListService.onAddNewIngredient(newIngr);
  }

}
