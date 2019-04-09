import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../common/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private dataStoreService: DataStorageService,
              private authService: AuthService) { }

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

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
