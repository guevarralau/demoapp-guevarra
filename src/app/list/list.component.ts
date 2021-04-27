import { Component, Input, OnInit ,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import UserInterface from '../interface/UserInterface'
import { Router } from '@angular/router';
const EDIT = 'EDIT';
const DELETE = 'DELETE';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Output() delete: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Input() user : UserInterface

 
  constructor(private router :Router) { }

  truncate(str :string, n: number){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };
  editUser() {
    // const payload : ButtonClickEventInterface = {action: EDIT, id: this.user.email }//will convert it to user.id once we get the backend up and running 
    this.router.navigateByUrl(`edit/${this.user.id}`);
  }
  deleteUser() {
    this.delete.emit(this.user.id)
  }
  ngOnInit(): void {
  }

}
