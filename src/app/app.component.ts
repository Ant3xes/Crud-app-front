import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpClient: HttpClient, private apiService: ApiService, private router: Router) { }

  title = 'CRUD-app';
  actionType = false
  errorMessage = false;
  userForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  })

  onChangeAction = () => {
    this.actionType = !this.actionType
    if (this.actionType) {
      console.log('signup')
    } else {
      console.log('login')
    }
  }

  onClickAction = () => {
    if (!this.actionType) {
      this.apiService.login(this.userForm.value.email, this.userForm.value.password).subscribe((data) => {
        console.log(data)
      })
    } else {
      if (this.userForm.value.password === this.userForm.value.confirmPassword) {
        this.apiService.newUser(this.userForm.value).subscribe((data) => {
          console.log(data);
        })
      } else {
        this.errorMessage = true;
      }
    }
  }
  navigate() {
    this.router.navigate(["user"])
  }
}


