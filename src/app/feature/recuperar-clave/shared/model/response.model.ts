export class RecuperarClaveResponse<T> {
  public valor: T;

  constructor(valor?: T) {
    this.valor = valor;
  }
}
