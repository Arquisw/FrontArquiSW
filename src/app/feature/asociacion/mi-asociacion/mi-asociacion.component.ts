import { Component, OnInit } from '@angular/core';
import { MiAsociacionService } from '../service/mi-asociacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mi-asociacion',
  templateUrl: './mi-asociacion.component.html',
  styleUrls: ['./mi-asociacion.component.scss']
})
export class MiAsociacionComponent implements OnInit {
  usuarioId = 0;
  mensajeError= '';
  asociacion;

  constructor(private miAsociacionService: MiAsociacionService,
            private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuarioId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.consultaAsociacion();
  }

  consultaAsociacion(): void {
    this.miAsociacionService.consultarAsociacion(this.usuarioId).subscribe((response) => {
      this.asociacion = response;
      console.log(response);
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

}
