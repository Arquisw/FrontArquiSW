import { Component, Input } from '@angular/core';
import { FaseResumen } from '../../shared/model/fase-resumen.module';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styleUrls: ['./fase.component.scss']
})
export class FaseComponent {
  @Input() fase: FaseResumen;
}
