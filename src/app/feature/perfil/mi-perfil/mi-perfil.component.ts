import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiPerfilService } from '../service/mi-perfil.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  @Input() usuario;
  usuarioId = 0;
  usuarioP;
  mensajeError= '';
  titulo = 'Guardar ó Actualizar Hoja de vida';

  constructor(private route: ActivatedRoute,
              private miPerfilSevice: MiPerfilService) { }

  ngOnInit(): void {
    console.log(this.usuario);
    this.usuarioId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.consultaUsuario();
  }

  consultaUsuario(): void {
    this.miPerfilSevice.consultarPersona(this.usuarioId).subscribe((response) => {
      this.usuarioP = response;
      //console.log(response);
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

}
