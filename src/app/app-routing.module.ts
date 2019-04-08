import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListAddComponent} from './list-add/list-add.component';
import {ListDetailComponent} from './list-detail/list-detail.component';
import {ListEditComponent} from './list-edit/list-edit.component';

const routes: Routes = [
  {
    path: 'list/create',
    component: ListAddComponent
  },
  {
    path: 'list',
    component: ListDetailComponent
  },
  {
    path: 'list/edit/:id',
    component: ListEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
