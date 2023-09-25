import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { NecesidadResumen } from 'src/app/feature/proyectos/shared/model/necesidad-resumen.model';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  listaDeArchivos(usuario): Observable<any[]> {
    return this.storage.ref('hojaDeVida/'+ usuario?.apellidos + usuario?.nombre +'/').listAll().pipe(
      map((result) => {
        const files = result.items.map((item) => {
          return {
            nombre: item.name,
            url: item.getDownloadURL(),
          };
        });
        return Object.values(files);
      })
    );
  }

  listaDeArchivosNecesidad(necesidad: NecesidadResumen): Observable<any[]> {
    return this.storage.ref('necesidad/' + necesidad.id + '/').listAll().pipe(
      map((result) => {
        const files = result.items.map((item) => {
          return {
            nombre: item.name,
            url: item.getDownloadURL(),
          };
        });
        return Object.values(files);
      })
    );
  }

  listaDeArchivosRequisitos(proyecto: ProyectoResumen): Observable<any[]> {
    return this.storage.ref('proyecto/' + proyecto.id + '/').listAll().pipe(
      map((result) => {
        const files = result.items.map((item) => {
          return {
            nombre: item.name,
            url: item.getDownloadURL(),
          };
        });
        return Object.values(files);
      })
    );
  }

  obtenerArchivoUrl(url: string): Observable<any> {
    const fileRef = this.storage.refFromURL(url);
    return fileRef.getMetadata();
  }
}
