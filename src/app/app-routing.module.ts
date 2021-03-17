import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'shows',
    loadChildren: () => import('./show/show.module').then(m => m.ShowModule)
  },
  {
    path: '',
    redirectTo: 'shows',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'shows',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
