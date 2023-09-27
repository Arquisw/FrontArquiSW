import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../shared/service/perfil.service';
import { StorageService } from '@shared/service/storage/storage.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuarioId = 0;
  usuario;
  mensajeError= '';
  titulo = 'Guardar ó Actualizar Hoja de vida';
  urlArchivo;
  hojaDeVida;
  urlDescarga;
  miPerfil = true;
  seCargoHojaDevida= false;
  estaCargandoGuardar = false;
  files = [];
  detalleDocumento;

  constructor(private viewportScroller: ViewportScroller,
              private miPerfilSevice: PerfilService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    const params = history.state;
    this.usuario = params.usuario;
    this.usuarioId = this.usuario?.id;

    this.viewportScroller.scrollToPosition([0, 0]);

    if(params.id !== null) {
      this.usuarioId = params.id;
      this.consultaUsuario();
    }

    if(this.usuario !== null) {
      this.obtenerListaArchivos();
    }
  }

  consultaUsuario(): void {
    this.miPerfil = false;
    this.miPerfilSevice.consultarPersona(this.usuarioId).subscribe((response) => {
      this.usuario = response;
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
    this.miPerfilSevice.guardarHojaDeVida(this.usuarioId, hojaDeVida ).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoGuardar = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  consultaHojaDeVida(): void {
    this.miPerfilSevice.consultarHojaDeVida(this.usuarioId).subscribe((response) => {
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
    this.miPerfilSevice.actualizarHojaDeVida(this.usuarioId, hojaDeVida ).subscribe(() => {
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
