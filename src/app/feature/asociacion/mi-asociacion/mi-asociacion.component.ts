import { Component, Input, OnInit } from '@angular/core';
import { MiAsociacionService } from '../service/mi-asociacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mi-asociacion',
  templateUrl: './mi-asociacion.component.html',
  styleUrls: ['./mi-asociacion.component.scss']
})
export class MiAsociacionComponent implements OnInit {

  @Input() id;
  mensajeError= '';
  asociacion;

  constructor(private miAsociacionService: MiAsociacionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.id);
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
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
