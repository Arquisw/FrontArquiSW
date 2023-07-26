import { Component, OnInit } from '@angular/core';
import { MiPerfilService } from '../service/mi-perfil.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  usuarioId = 0;
  usuario;
  mensajeError= '';
  titulo = 'Guardar ó Actualizar Hoja de vida';
  urlArchivo;

  constructor(private miPerfilSevice: MiPerfilService) { }

  ngOnInit(): void {
    const params = history.state;

    this.usuarioId = params.id;
    this.usuario = params.usuario;
    if(params.id !== null) {
      this.consultaUsuario();
    }
    console.log(this.usuarioId);
  }

  consultaUsuario(): void {
    this.miPerfilSevice.consultarPersona(this.usuarioId).subscribe((response) => {
      this.usuario = response;
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  recibirHojaDeVida(valor: any): void {
    this.urlArchivo = valor;
    this.guardarHojaDeVida();
  }

  guardarHojaDeVida(): void {
    const hojaDeVida = {
      ruta: this.urlArchivo
    };

    this.miPerfilSevice.guardarHojaDeVida(this.usuario.id,hojaDeVida ).subscribe(() => {},
      (error) => {
        this.mensajeError =error?.error?.mensaje;
      });
  }

}
