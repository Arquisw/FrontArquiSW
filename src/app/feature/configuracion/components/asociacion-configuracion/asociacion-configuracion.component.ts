import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsociacionResumen } from '../../shared/model/asociacion-resumen';
import { ConfiguracionService } from '../../shared/service/configuracion.service';

@Component({
  selector: 'app-asociacion-configuracion',
  templateUrl: './asociacion-configuracion.component.html',
  styleUrls: ['./asociacion-configuracion.component.scss']
})
export class AsociacionConfiguracionComponent implements OnInit {
  actualizacionForm: FormGroup;
  asociacionResumen: AsociacionResumen;
  actualizacionError= false;
  actualizacionExitosa= false;
  mensajeError= '';
  mensajeActualizacion= '';
  usuarioId: number = 0;

  constructor(private route: ActivatedRoute, private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    this.usuarioId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.consultarAsociacion()
  }

  onClickUpdate(): void {
    /*this.registroError= false;
    const usuario: Usuario= new Usuario(0,this.registroForm.get('nombreRegistro')?.value,this.registroForm.get('apellidosRegistro')?.value,this.registroForm.get('correoRegistro')?.value,this.registroForm.get('claveRegistro')?.value);
    if(this.registroForm.get('claveRegistro')?.value===this.registroForm.get('confirmarClaveRegistro')?.value){
      this.servicioGestionusuario.registrarUsuario(usuario).subscribe((response) => {
        console.log('Data:', response);
        this.registroExitoso= true;
      },
      (error) => {
        this.registroError= true;
        this.mensajeError =error?.error?.mensaje;
      });
    }
    else{
      this.registroError= true;
      this.mensajeError= 'Las contraseñas no son iguales';
    }*/
  }

  onClickDelete(): void {

  }

  consultarAsociacion(): void {
    this.configuracionService.consultarAsociacionPorId(this.usuarioId).subscribe((response) => {
      this.asociacionResumen = response;
    },
    (error) => {
      this.mensajeError = error.message;
    });
  }
}
