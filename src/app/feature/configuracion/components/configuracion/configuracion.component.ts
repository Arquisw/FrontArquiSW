import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaResumen } from '../../shared/model/persona-resumen.model';
import { ConfiguracionService } from '../../shared/service/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  usuarioId = 0;
  personaResumen: PersonaResumen;
  tieneAsociacion = false;

  constructor(private route: ActivatedRoute, private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    this.usuarioId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.consultarUsuario();
  }

  consultarUsuario(): void {
    this.configuracionService.consultarUsuarioPorId(this.usuarioId).subscribe((response) => {
      this.personaResumen = response;
      this.filtrarMenu(response.roles);
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
