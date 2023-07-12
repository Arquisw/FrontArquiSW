import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  constructor(private http: HttpService) { }

  registrarAsociacion(asocicion, id: number) {
    return this.http.doPost(environment.endpoint +'/asociaciones/'+ id, asocicion);
  }
}
