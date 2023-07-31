import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class AsociacionService {

  constructor(private http: HttpService) { }

  consultarAsociacion(id: number) {
    return this.http.doGet(environment.endpoint +'/asociaciones/'+ id);
  }
}
