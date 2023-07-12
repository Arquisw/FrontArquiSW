import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiAsociacionService {

  constructor(private http: HttpService) { }

  consultarAsociacion(id: number) {
    return this.http.doGet(environment.endpoint +'/asociaciones/'+ id);
  }
}
