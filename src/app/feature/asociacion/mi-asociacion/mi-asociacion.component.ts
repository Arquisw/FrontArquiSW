import { Component, OnInit } from '@angular/core';
import { MiAsociacionService } from '../service/mi-asociacion.service';

@Component({
  selector: 'app-mi-asociacion',
  templateUrl: './mi-asociacion.component.html',
  styleUrls: ['./mi-asociacion.component.scss']
})
export class MiAsociacionComponent implements OnInit {

  id;
  mensajeError= '';
  asociacion;

  constructor(private miAsociacionService: MiAsociacionService) { }

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
