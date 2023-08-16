import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AdministradorService } from '../../shared/service/administrador.service';

@Component({
  selector: 'app-aprobaciones',
  templateUrl: './aprobaciones.component.html',
  styleUrls: ['./aprobaciones.component.scss']
})
export class AprobacionesComponent implements  OnInit{
  necesidadAprobar: any[] = [];
  mensajeError= '';
  hayProyectosPorAprobar = false;

  mensajeAsociacion;
  registroError;

  constructor(private router: Router,private admistradorService: AdministradorService)  { }

  ngOnInit(): void {
    this.consultaAprobaciones();
  }

  obtnerIdModal(id: number): string {
    return 'descripcionModal' + id;
  }

  obtnerIdModalRechazo(nombreProyecto: string): string {
    return 'rechazoModal' + nombreProyecto;
  }

  consultaAprobaciones(): void {
    this.necesidadAprobar= [];
    let petecionAprobar;
    this.admistradorService.consultarNecesidadesPendienteAprobacion().subscribe((response) => {
      petecionAprobar = response;
      this.necesidadAprobar = petecionAprobar;

      if(this.necesidadAprobar.length > 0) {
        this.hayProyectosPorAprobar = true;
      }

      console.log(this.necesidadAprobar);
    });
  }

  AprobarNecesidad(id: number): void {
    this.admistradorService.aprobarNecesidad(id).subscribe(() => {
      this.consultaAprobaciones();
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  declinarNecesidad(id: number): void {
    let razonRechazo = {
      motivo: 'holi'
    };
    this.admistradorService.declinarNecesidad(id, razonRechazo).subscribe(() => {
      this.consultaAprobaciones();
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  rechazarPostulacion(motivo: string): void 
  {
    console.log('Se rechazo por: ' + motivo);
  }

  abrirPerfilProyecto(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        proyecto: false,
      }
    };
    this.router.navigate(['/proyecto'], navigationExtras);
  }

}
