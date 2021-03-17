import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlValidationPipe } from './pipes/url-validation.pipe';

@NgModule({
  declarations: [UrlValidationPipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
