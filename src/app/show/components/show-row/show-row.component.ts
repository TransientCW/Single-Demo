import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Show } from '../../shared/model/show.model';

@Component({
  selector: 'single-show-row',
  templateUrl: './show-row.component.html',
  styleUrls: ['./show-row.component.scss']
})
export class ShowRowComponent {
  @Input() show: Show;
  @Output() deleteShowEmitter = new EventEmitter<Show>();
}
