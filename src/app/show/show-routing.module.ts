import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowListComponent } from './components/show-list/show-list.component';
import { CreateShowComponent } from './components/create-show/create-show.component';

const routes: Routes = [
  {
    path: '',
    component: ShowListComponent
  },
  {
    path: 'create',
    component: CreateShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRoutingModule {
}
