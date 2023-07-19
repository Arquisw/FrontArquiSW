import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class MiPerfilService {

  constructor(private http: HttpService) { }

  consultarPersona(id: number) {
    return this.http.doGet(environment.endpoint +'/usuarios/'+ id);
  }
}
