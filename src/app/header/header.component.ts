import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../common/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private dataStoreService: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStoreService.storeRecipes().subscribe(
      (response: Response) => {console.log(response);}
    );
  }

  onFetchData() {
    this.dataStoreService.getRecipes();
  }
}
