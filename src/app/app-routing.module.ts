import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
// import { from } from 'rxjs';
import {CreateComponent} from './create/create.component'
import { UserListComponent } from './user-list/user-list.component'
import { HomeComponent } from './home/home.component'
import { EditComponent } from './edit/edit.component';

const route = (path : string, component) => ({path,component})

const routes: Routes = [
  route('',HomeComponent),
  route('edit/:id',EditComponent),
  route('create',CreateComponent),
  route('list',UserListComponent),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
