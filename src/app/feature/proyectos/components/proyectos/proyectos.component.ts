import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';
import { PersonaResumen } from 'src/app/feature/configuracion/shared/model/persona-resumen.model';
import { UsuarioResumen } from 'src/app/feature/configuracion/shared/model/usuario-resumen.model';
import { ConfiguracionService } from 'src/app/feature/configuracion/shared/service/configuracion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  public menuItemsSinAsociacion: MenuItem[] = [
    { url: './buscar', nombre: 'Buscar' },
    { url: './proyectos-seleccionado', nombre: 'Mis Proyectos' },
    { url: './proyectos-postulado', nombre: 'Proyectos Postulado' }
  ];

  public menuItemsConAsociacion: MenuItem[] = [
    { url: './buscar', nombre: 'Buscar' },
    { url: './mis-proyectos', nombre: 'Mis Proyectos' },
  ];
  usuarioId = 0;
  correo = '';
  tieneAsociacion = false;
  personaResumen: PersonaResumen;
  usuarioResumen: UsuarioResumen;

  constructor(private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

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
        this.menuItems = this.menuItemsConAsociacion;
      } else {
        this.menuItems = this.menuItemsSinAsociacion;
      }
    });
  }
}
