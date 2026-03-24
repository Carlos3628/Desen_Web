export class Telefone {
  private _ddd: string;
  private _numero: number;
  private _tipo: string;

  constructor(ddd: string, numero: number, tipo: string) {
    this._ddd = ddd;
    this._numero = numero;
    this._tipo = tipo;
  }

  get ddd(): string {
    return this._ddd;
  }

  set ddd(value: string) {
    this._ddd = value;
  }

  get numero(): number {
    return this._numero;
  }

  set numero(value: number) {
    if (value <= 0) throw new Error("Número inválido");
    this._numero = value;
  }

  get tipo(): string {
    return this._tipo;
  }

  set tipo(value: string) {
    this._tipo = value;
  }
}