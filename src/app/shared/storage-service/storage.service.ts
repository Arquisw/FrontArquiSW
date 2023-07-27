import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }


  listaDeArchivos(usuario): Observable<any[]> {
    return this.storage.ref('ruta/hojaDeVida/'+ usuario.apellidos + usuario.nombre +'/').listAll().pipe(
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
