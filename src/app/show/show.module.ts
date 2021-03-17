import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRoutingModule } from './show-routing.module';
import { ShowListComponent } from './components/show-list/show-list.component';
import { CreateShowComponent } from './components/create-show/create-show.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { showReducer } from '../state/shows-state/show.reducer';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ShowEffects } from '../state/shows-state/show.effects';
import { UrlValidationPipe } from '../shared/pipes/url-validation.pipe';
import { ShowRowComponent } from './components/show-row/show-row.component';


@NgModule({
  declarations: [
    CreateShowComponent,
    ShowListComponent,
    ShowRowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    SharedModule,
    ShowRoutingModule,
    StoreModule.forFeature('shows', showReducer),
    EffectsModule.forFeature([
      ShowEffects
    ]),
  ],
  providers: [UrlValidationPipe]
})
export class ShowModule {
}
