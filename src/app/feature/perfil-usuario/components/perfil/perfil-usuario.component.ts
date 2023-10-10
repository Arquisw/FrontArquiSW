import { Component, OnInit } from '@angular/core';
import { PerfilUsuarioService } from '../../shared/service/perfil-usuario.service';
import { StorageService } from '@shared/service/storage/storage.service';
import { ViewportScroller } from '@angular/common';
import { UsuarioService } from '@shared/service/usuario/usuario.service';
import { PersonaResumen } from '@shared/model/usuario/persona-resumen.model';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  usuarioId = 0;
  usuarioActualId = 0;
  authorities: string[] = [];
  usuario: PersonaResumen;
  mensajeError= '';
  titulo = 'Guardar o actualizar hoja de vida';
  urlArchivo;
  hojaDeVida;
  urlDescarga;
  miPerfil = false;
  seCargoHojaDevida= false;
  estaCargandoGuardar = false;
  files = [];
  detalleDocumento;

  constructor(private viewportScroller: ViewportScroller,
              private perfilUsuarioService: PerfilUsuarioService,
              private storageService: StorageService,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.posicionarPaginaAlInicio();
    this.inicializarParametrosDelToken();

    const params = history?.state;
    this.usuarioId = params?.id;
    this.consultaUsuario();
  }

  inicializarParametrosDelToken(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));

    this.usuarioActualId = tokenPayload.id;
    this.authorities = tokenPayload.authorities.split(',');
  }

  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  consultaUsuario(): void {
    this.usuarioService.consultarPersonaPorId(this.usuarioId).subscribe((response) => {
      this.usuario = response;

      if(this.usuario.id === this.usuarioActualId) {
        this.miPerfil = true;

        this.authorities.forEach(authority => {
          if (authority === 'ROLE_ADMINISTRADOR') {
            this.miPerfil = false;
          }

          if (authority === 'ROLE_ASOCIACION') {
            this.miPerfil = false;
          }
        });
      }

      this.obtenerListaArchivos();
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  recibirUrlHojaDeVida(valor: any): void {
    this.estaCargandoGuardar = true;

    this.urlArchivo = valor;
    if(this.files.length === 0) {
      this.guardarHojaDeVida();
    } else {
      this.actualizarHojaDeVida();
    }

    this.obtenerListaArchivos();
  }

  guardarHojaDeVida(): void {
    const hojaDeVida = {
      ruta: this.urlArchivo
    };
    this.perfilUsuarioService.guardarHojaDeVida(this.usuarioId, hojaDeVida ).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoGuardar = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  consultaHojaDeVida(): void {
    this.perfilUsuarioService.consultarHojaDeVida(this.usuarioId).subscribe((response) => {
      this.hojaDeVida = response;
      this.urlDescarga = this.hojaDeVida?.ruta;
      this.seCargoHojaDevida = true;
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  actualizarHojaDeVida(): void {
    const hojaDeVida = {
      ruta: this.urlArchivo
    };
    this.perfilUsuarioService.actualizarHojaDeVida(this.usuarioId, hojaDeVida ).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoGuardar = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  obtenerListaArchivos() {
    this.storageService.listaDeArchivos(this.usuario).subscribe((files) => {
      this.files = files;

      if(files.length > 0) {
        this.consultaHojaDeVida();
      }
    });
  }

  downloadFile(): void {
    this.storageService.obtenerArchivoUrl(this.urlDescarga).subscribe((file) => {
      this.detalleDocumento = file;
      const link = document.createElement('a');
      link.href = this.urlDescarga;
      link.target = '_blank';
      link.download = this.urlDescarga.substring(this.urlDescarga.lastIndexOf('/') + 1);
      link.click();
    });
  }
}
