import { Component, OnInit } from '@angular/core';
import { PersonaResumen } from '../../shared/model/persona-resumen.model';
import { ConfiguracionService } from '../../shared/service/configuracion.service';
import { UsuarioResumen } from '../../shared/model/usuario-resumen.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  usuarioId = 0;
  correo = '';
  personaResumen: PersonaResumen;
  usuarioResumen: UsuarioResumen;
  tieneAsociacion = false;

  constructor(private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    console.log('ID: ' + this.usuarioId);

    this.consultarPersona();
  }

  consultarPersona(): void {
    this.configuracionService.consultarPersonaPorId(this.usuarioId).subscribe((response) => {
      this.personaResumen = response;
      this.correo = this.personaResumen.correo;
      this.consultarUsuario();
    });
  }

  consultarUsuario(): void {
    this.configuracionService.consultarUsuarioPorCorreo(this.correo).subscribe((response) => {
      this.usuarioResumen = response;
      this.filtrarMenu(this.usuarioResumen.roles);
    });
  }

  filtrarMenu(roles): void {
    roles.forEach(rol => {
      if (rol.nombre === 'ROLE_ASOCIACION') {
        this.tieneAsociacion = true;
      }
    });
  }
}
