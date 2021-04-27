import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import UserInterface from '../interface/UserInterface'
import {url} from '../http'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute , private http : HttpClient) { }

  user: UserInterface = {
    id: '',
    name : '',
    email: '',
    address: '',
  }

  errorMessage : string | null = null

  editUser() {
    console.log('edit user')
    //use id to edit data
    this.errorMessage = null;
    const now : Date = new Date();
    const data =  { usr_fullname: this.user.name, usr_email: this.user.email, usr_address: this.user.address, updated_at: now.toISOString()}
    console.log(data)
    this.http.post<any>(url('users'), data).subscribe({
      next: data => {
          console.log('successfully created')
          this.router.navigateByUrl('list')
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
    this.router.navigateByUrl('list')
  }

  ngOnInit(): void {
    let id: string | number = this.route.snapshot.params['id']
    console.log('user with id:',id)
    this.http.get<any>(url(`users/${id}`)).subscribe(
      response => {
        this.user = { id: response._id , name: response.usr_fullname, email: response.usr_email, address:response.usr_address}
    })
  }

}
