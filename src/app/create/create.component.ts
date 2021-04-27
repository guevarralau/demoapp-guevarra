import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {url} from '../http'
import { Router } from '@angular/router';
import UserInterface from '../interface/UserInterface';

interface UserInterFace {
  name: string,
  email:string,
  address:string,
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})



export class CreateComponent implements OnInit {
  
  user: UserInterface = {
    id: '',
    name : '',
    email: '',
    address: '',
  }
  errorMessage : string | null = null

  constructor(private router : Router, private http: HttpClient) { }

  createUser() {
  
    if(this.user.name.trim() === '' || this.user.email.trim() === '' || this.user.address.trim() === ''){
      return false;
    }
    this.errorMessage = null;
    const data = { 
      usr_email: this.user.email,
      usr_fullname:this.user.name ,
      usr_address: this.user.address,
    }
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
    
  }

  ngOnInit(): void {
  }

}
