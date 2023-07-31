import { Component, OnInit } from '@angular/core';
import { AsociacionService } from '../../shared/service/asociacion.service';

@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styleUrls: ['./asociacion.component.scss']
})
export class AsociacionComponent implements OnInit {

  id;
  mensajeError= '';
  asociacion;

  constructor(private miAsociacionService: AsociacionService) { }

  ngOnInit(): void {
    const params = history.state;
    this.id = params.id;

    this.consultaAsociacion();
  }

  consultaAsociacion(): void {
    this.miAsociacionService.consultarAsociacion(this.id).subscribe((response) => {
      this.asociacion = response;
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

}
