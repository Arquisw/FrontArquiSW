import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../shared/service/administrador.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-administrar-eliminaciones',
  templateUrl: './administrar-eliminaciones.component.html',
  styleUrls: ['./administrar-eliminaciones.component.scss']
})
export class AdministrarEliminacionesComponent implements OnInit{
  usuariosEliminar: any[] = [];
  asociacionesEliminar: any[] = [];
  necesidadEliminar: any[] = [];
  hayUsuariosAEliminar = false;
  hayAsociacionesAEliminar = false;
  hayNecesidadAEliminar = false;
  estaCargandoEliminarUsuario : boolean[] = []; 
  estaCargandoEliminarAsociacion : boolean[] = []; 
  estaCargandoEliminarProyecto : boolean[] = []; 
  mensajeEliminarProyecto= '¿Estás seguro de desea eliminar el proyecto?';
  mensajeEliminarAsociacion = '¿Estás seguro de desea eliminar la Asociacion?';
  mensajeEliminarUsuario= '¿Estás seguro de desea eliminar el usuario?';
  mensajeError= '';


  constructor(private router: Router,
              private admistradorService: AdministradorService)  {
                this.usuariosEliminar.forEach(() => this.estaCargandoEliminarUsuario.push(false));
                this.asociacionesEliminar.forEach(() => this.estaCargandoEliminarAsociacion.push(false));
                this.necesidadEliminar.forEach(() => this.estaCargandoEliminarProyecto.push(false));

               }

  ngOnInit(): void {
    this.consultaPeticionesUsuarioAEliminar();
    this.consultaPeticionesAsociacionesAEliminar();
    this.consultaPeticionesNecesidadAEliminar();
  }

  consultaPeticionesUsuarioAEliminar(): void {
    this.usuariosEliminar= [];
    let petecionEliminar;
    this.admistradorService.consultarPeticionesUsuariosEliminar().subscribe((response) => {
      petecionEliminar = response;
      if(petecionEliminar.length > 0) {
        this.hayUsuariosAEliminar = true;
      }
      for (const peticion of petecionEliminar) {
        this.consultarPersonasAEliminar(peticion?.usuario);
      }
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  consultarPersonasAEliminar(id: number): void {
    this.admistradorService.consultarPersonaParaEliminar(id).subscribe((response) => {
      this.usuariosEliminar.push(response);
    },
    (error) => {
      this.hayUsuariosAEliminar= false;
      this.mensajeError=error.message;
    });
  }

  eliminarPersona(id: number,indice:number): void {
    this.estaCargandoEliminarUsuario[indice] = true;

    this.admistradorService.eliminarPersona(id).subscribe(() => {
      this.consultaPeticionesUsuarioAEliminar();
    },
    (error) => {
      this.estaCargandoEliminarUsuario[indice] = false;
      this.mensajeError=error.message;
    });
  }

  abrirPerfil(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        usuario: null,
      }
    };
    this.router.navigate(['/perfil'], navigationExtras);
  }

  consultaPeticionesAsociacionesAEliminar(): void {
    this.asociacionesEliminar = [];
    let petecionAsociacionEliminar;
    this.admistradorService.consultarPeticionesAsociacionAEliminar().subscribe((response) => {
      petecionAsociacionEliminar = response;
      if(petecionAsociacionEliminar.length > 0) {
        this.hayAsociacionesAEliminar = true;
      } else {
        this.hayAsociacionesAEliminar = false;
      }
      for (const peticion of petecionAsociacionEliminar) {
        this.consultaAsociacionAEliminar(peticion?.asociacion);
      }
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  consultaAsociacionAEliminar(id: number): void {
    this.admistradorService.consultarAsociacionParaEliminar(id).subscribe((response) => {
      this.asociacionesEliminar.push(response);
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  eliminarAsociacion(id: number,indice:number): void {
    this.estaCargandoEliminarAsociacion[indice] = true;

    this.admistradorService.eliminarAsociacion(id).subscribe(() => {
      this.consultaPeticionesAsociacionesAEliminar();
    },
    (error) => {
      this.estaCargandoEliminarAsociacion[indice] = false;
      this.mensajeError=error.message;
    });
  }

  abrirPerfilAsociacion(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        asociacion: false,
      }
    };
    this.router.navigate(['/asociacion'], navigationExtras);
  }

  consultaPeticionesNecesidadAEliminar(): void {
    this.necesidadEliminar =[];
    let petecionNecesidadEliminar;
    this.admistradorService.consultarPeticionesNecesidadAEliminar().subscribe((response) => {
      petecionNecesidadEliminar = response;
      if(petecionNecesidadEliminar.length > 0) {
        this.hayNecesidadAEliminar = true;
      }
      for (const peticion of petecionNecesidadEliminar) {
        this.consultaNecesidadAEliminar(peticion?.necesidad);
      }
    },
    (error) => {
      this.hayAsociacionesAEliminar = false;
      this.mensajeError=error.message;
    });
  }

  consultaNecesidadAEliminar(id: number): void {
    this.admistradorService.consultarNecesidadParaEliminar(id).subscribe((response) => {
      this.necesidadEliminar.push(response);
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  eliminarProyecto(id: number,indice:number): void {
    this.estaCargandoEliminarProyecto[indice] = true;

    this.admistradorService.eliminarProyecto(id).subscribe(() => {
      this.consultaPeticionesNecesidadAEliminar();
    },
    (error) => {
      this.estaCargandoEliminarProyecto[indice] = false;
      this.mensajeError=error.message;
    });
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

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }
}
