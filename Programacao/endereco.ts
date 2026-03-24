export class Endereco {
  private _rua: string;
  private _numero: number;
  private _cidade: string;
  private _estado: string;

  constructor(rua: string, numero: number, cidade: string, estado: string) {
    this._rua = rua;
    this._numero = numero;
    this._cidade = cidade;
    this._estado = estado;
  }

  get rua(): string {
    return this._rua;
  }

  set rua(value: string) {
    this._rua = value;
  }

  get numero(): number {
    return this._numero;
  }

  set numero(value: number) {
    if (value <= 0) throw new Error("Número inválido");
    this._numero = value;
  }

  get cidade(): string {
    return this._cidade;
  }

  set cidade(value: string) {
    this._cidade = value;
  }

  get estado(): string {
    return this._estado;
  }

  set estado(value: string) {
    this._estado = value;
  }
}