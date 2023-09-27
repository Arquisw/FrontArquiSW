export class Respuesta<T> {
  public valor: T;

  constructor(valor?: T) {
    this.valor = valor;
  }
}
