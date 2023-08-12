import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../service/administrador.service';
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
  mensajeError= '';
  hayUsuariosAEliminar = false;
  hayAsociacionesAEliminar = false;
  hayNecesidadAEliminar = false;
  mensajeEliminarProyecto= '¿Estás seguro de desea eliminar el proyecto?';
  mensajeEliminarAsociacion = '¿Estás seguro de desea eliminar la Asociacion?';
  mensajeEliminarUsuario= '¿Estás seguro de desea eliminar el usuario?';
  mensajeModal = '';
  idEliminar;




  constructor(private router: Router,
    private admistradorService: AdministradorService)  { }
    
  ngOnInit(): void {
    this.consultaPeticionesUsuarioAEliminar();
    this.consultaPeticionesAsociacionesAEliminar();
    this.consultaPeticionesNecesidadAEliminar();
  }

  eliminar(mensaje: string, id:number){
    if(mensaje === this.mensajeEliminarAsociacion)
    {
      this.mensajeModal = this.mensajeEliminarAsociacion;
      this.idEliminar = id;
    } else if(mensaje === this.mensajeEliminarUsuario)
    {
      this.mensajeModal = this.mensajeEliminarUsuario;
      this.idEliminar = id;
    } else if(mensaje === this.mensajeEliminarProyecto)
    {
      this.mensajeModal = this.mensajeEliminarProyecto;
      this.idEliminar = id;
    }
  }

  eliminarPeticion():void {
    if(this.mensajeModal === this.mensajeEliminarAsociacion)
    {
      console.log('Se elimina la asociacion' + this.idEliminar)
      //this.eliminarAsociacion(this.idEliminar);
    }else if(this.mensajeModal === this.mensajeEliminarUsuario)
    {
      console.log('Se elimina el usuario' + this.idEliminar)
    } else if(this.mensajeModal === this.mensajeEliminarProyecto)
    {
      console.log('Se elimina el proyecyo' + this.idEliminar)
    }
  }

  consultaPeticionesUsuarioAEliminar(): void {
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

  eliminarPersona(id: number): void {
    this.admistradorService.eliminarPersona(id).subscribe(() => {
      this.consultaPeticionesUsuarioAEliminar();
    },
    (error) => {
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
    let petecionAsociacionEliminar;
    this.admistradorService.consultarPeticionesAsociacionAEliminar().subscribe((response) => {
      petecionAsociacionEliminar = response;
      if(petecionAsociacionEliminar.length > 0) {
        this.hayAsociacionesAEliminar = true;
      }
      for (const peticion of petecionAsociacionEliminar) {
        this.consultaAsociacionAEliminar(peticion?.asociacion);
      }
    },
    (error) => {
      this.hayAsociacionesAEliminar = false;
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

  eliminarAsociacion(id: number): void {
    this.admistradorService.eliminarAsociacion(id).subscribe(() => {
      this.consultaPeticionesAsociacionesAEliminar();
    },
    (error) => {
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
      this.hayNecesidadAEliminar = false;
      this.mensajeError=error.message;
    });
  }

  eliminarProyecto(id: number): void {
    this.admistradorService.eliminarAsociacion(id).subscribe(() => {
      this.consultaPeticionesNecesidadAEliminar();
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }




}
