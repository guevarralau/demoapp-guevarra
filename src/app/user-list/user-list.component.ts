import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {url} from '../http'
import UserInterface from '../interface/UserInterface';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  users : UserInterface[] = []
  errorMessage : string | null = null
  constructor(private http: HttpClient) { }

  deleteUser(data: string | number) {
    console.log('delete user')
    console.log(data)

    this.http.delete<any>(url(`users/${data}`)).subscribe({
      next: response => {
          console.log(`successfully deleted ${response.usr_fullname}`)
          console.log(this.users)
          this.users = this.users.filter( item => item.id !== data)
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  })
  }

  ngOnInit(): void {
      this.http.get<any>(url('users')).subscribe(response => {
        console.log(response)
        this.users =  response.map( (item) => ({ id: item._id , name: item.usr_fullname, email: item.usr_email, address:item.usr_address}))
      })
  }
}
