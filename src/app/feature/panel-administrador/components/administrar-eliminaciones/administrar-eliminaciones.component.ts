import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../shared/service/administrador.service';
import { NavigationExtras, Router } from '@angular/router';
import { AsociacionService } from '@shared/service/asociacion/asociacion.service';
import { ProyectoService } from '@shared/service/proyecto/proyecto.service';
import { UsuarioService } from '@shared/service/usuario/usuario.service';
import { PersonaResumen } from '@shared/model/usuario/persona-resumen.model';
import { AsociacionResumen } from '@shared/model/asociacion/asociacion-resumen.model';
import { NecesidadResumen } from '@shared/model/proyecto/necesidad-resumen.model';
import { PeticionEliminacionPersonaResumen } from '../../shared/model/peticion-eliminacion-persona-resumen.model';
import { PeticionEliminacionAsociacionResumen } from '../../shared/model/peticion-eliminacion-asociacion-resumen.model';
import { PeticionEliminacionNecesidadResumen } from '../../shared/model/peticion-eliminacion-necesidad-resumen.model';

@Component({
  selector: 'app-administrar-eliminaciones',
  templateUrl: './administrar-eliminaciones.component.html',
  styleUrls: ['./administrar-eliminaciones.component.scss'],
})
export class AdministrarEliminacionesComponent implements OnInit {
  usuariosEliminar: PersonaResumen[] = [];
  asociacionesEliminar: AsociacionResumen[] = [];
  necesidadEliminar: NecesidadResumen[] = [];
  hayUsuariosAEliminar = false;
  hayAsociacionesAEliminar = false;
  hayNecesidadAEliminar = false;
  estaCargandoEliminarUsuario: boolean[] = [];
  estaCargandoEliminarAsociacion: boolean[] = [];
  estaCargandoEliminarProyecto: boolean[] = [];
  mensajeEliminarProyecto = '¿Estás seguro desea eliminar el proyecto?';
  mensajeEliminarAsociacion = '¿Estás seguro desea eliminar la asociación?';
  mensajeEliminarUsuario = '¿Estás seguro desea eliminar el usuario?';
  mensajeError = '';
  p1 = 1;
  p2 = 1;
  p3 = 1;
  totalNecesidades=0;
  totalAsociaciones=0;
  totalUsuarios=0;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private asociacionService: AsociacionService,
    private proyectoService: ProyectoService,
    private admistradorService: AdministradorService
  ) {
    this.usuariosEliminar.forEach(() =>
      this.estaCargandoEliminarUsuario.push(false)
    );
    this.asociacionesEliminar.forEach(() =>
      this.estaCargandoEliminarAsociacion.push(false)
    );
    this.necesidadEliminar.forEach(() =>
      this.estaCargandoEliminarProyecto.push(false)
    );
  }

  ngOnInit(): void {
    this.consultaPeticionesUsuarioAEliminar();
    this.consultaPeticionesAsociacionesAEliminar();
    this.consultaPeticionesNecesidadAEliminar();
  }

  consultaPeticionesUsuarioAEliminar(): void {
    this.usuariosEliminar = [];
    let petecionesEliminar: PeticionEliminacionPersonaResumen[];
    this.admistradorService.consultarPeticionesUsuariosEliminar(this.p1-1).subscribe((response) => {
      petecionesEliminar = response.content;
      this.totalUsuarios = response.totalElements;
      if (petecionesEliminar.length > 0) {
        this.hayUsuariosAEliminar = true;
      }

      for (const peticion of petecionesEliminar) {
        this.consultarPersonasAEliminar(peticion?.usuario);
      }
    },
    (error) => {
      this.mensajeError = error.message;
    }
    );
  }

  onPageChangeUsuario(event: number): void {
    this.p1 = event;
    this.consultaPeticionesUsuarioAEliminar();
  }
  consultarPersonasAEliminar(id: number): void {
    this.usuarioService.consultarPersonaPorId(id).subscribe((response) => {
      this.usuariosEliminar.push(response);
    },
    (error) => {
      this.hayUsuariosAEliminar = false;
      this.mensajeError = error.message;
    });
  }

  eliminarPersona(id: number, indice: number): void {
    this.estaCargandoEliminarUsuario[indice] = true;

    this.admistradorService.eliminarPersona(id).subscribe(() => {
      this.consultaPeticionesUsuarioAEliminar();
    }, (error) => {
      this.estaCargandoEliminarUsuario[indice] = false;
      this.mensajeError = error.message;
    });
  }

  abrirPerfil(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        usuario: null,
      },
    };
    this.router.navigate(['/perfil'], navigationExtras);
  }

  consultaPeticionesAsociacionesAEliminar(): void {
    this.asociacionesEliminar = [];
    let petecionesAsociacionEliminar: PeticionEliminacionAsociacionResumen[];
    this.admistradorService.consultarPeticionesAsociacionAEliminar(this.p2-1).subscribe((response) => {
      petecionesAsociacionEliminar = response.content;
      this.totalAsociaciones = response.totalElements;
      if (petecionesAsociacionEliminar.length > 0) {
        this.hayAsociacionesAEliminar = true;
      } else {
        this.hayAsociacionesAEliminar = false;
      }
      for (const peticion of petecionesAsociacionEliminar) {
        this.consultaAsociacionAEliminar(peticion?.asociacion);
      }
    },(error) => {
      this.mensajeError = error.message;
    });
  }
  onPageChangeAsociacion(event: number): void {
    this.p2 = event;
    this.consultaPeticionesAsociacionesAEliminar();
  }
  consultaAsociacionAEliminar(id: number): void {
    this.asociacionService.consultarAsociacionPorId(id).subscribe((response) => {
      this.asociacionesEliminar.push(response);
    }, (error) => {
      this.mensajeError = error.message;
    });
  }

  eliminarAsociacion(id: number, indice: number): void {
    this.estaCargandoEliminarAsociacion[indice] = true;

    this.admistradorService.eliminarAsociacion(id).subscribe(
      () => {
        this.consultaPeticionesAsociacionesAEliminar();
      },
      (error) => {
        this.estaCargandoEliminarAsociacion[indice] = false;
        this.mensajeError = error.message;
      }
    );
  }

  abrirPerfilAsociacion(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        asociacion: false,
      },
    };
    this.router.navigate(['/asociacion'], navigationExtras);
  }

  consultaPeticionesNecesidadAEliminar(): void {
    this.necesidadEliminar = [];
    let petecionesNecesidadEliminar: PeticionEliminacionNecesidadResumen[];
    this.admistradorService.consultarPeticionesNecesidadAEliminar(this.p3-1).subscribe((response) => {
      petecionesNecesidadEliminar = response.content;
      this.totalNecesidades = response.totalElements;
      if (petecionesNecesidadEliminar.length > 0) {
        this.hayNecesidadAEliminar = true;
      }
      for (const peticion of petecionesNecesidadEliminar) {
        this.consultaNecesidadAEliminar(peticion?.necesidad);
      }
    }, (error) => {
      this.hayAsociacionesAEliminar = false;
      this.mensajeError = error.message;
    });
  }

  onPageChangeNecesidad(event: number): void {
    this.p3 = event;
    this.consultaPeticionesNecesidadAEliminar();
  }

  consultaNecesidadAEliminar(id: number): void {
    this.proyectoService.consultarNecesidadPorId(id).subscribe((response) => {
      this.necesidadEliminar.push(response);
    },
    (error) => {
      this.mensajeError = error.message;
    });
  }

  eliminarProyecto(id: number, indice: number): void {
    this.estaCargandoEliminarProyecto[indice] = true;

    this.admistradorService.eliminarProyecto(id).subscribe(() => {
      this.consultaPeticionesNecesidadAEliminar();
    },(error) => {
      this.estaCargandoEliminarProyecto[indice] = false;
      this.mensajeError = error.message;
    });
  }

  abrirPerfilProyecto(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        proyecto: false,
      },
    };

    this.router.navigate(['/proyecto'], navigationExtras);
  }

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }
}
