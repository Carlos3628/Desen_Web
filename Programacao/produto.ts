export class Produto {
  private _codigo: number;
  private _descricao: string;
  private _valor: number;

  constructor(codigo: number, descricao: string, valor: number) {
    this._codigo = codigo;
    this._descricao = descricao;
    this._valor = valor;
  }

  get codigo(): number {
    return this._codigo;
  }

  set codigo(value: number) {
    this._codigo = value;
  }

  get descricao(): string {
    return this._descricao;
  }

  set descricao(value: string) {
    this._descricao = value;
  }

  get valor(): number {
    return this._valor;
  }

  set valor(value: number) {
    if (value < 0) throw new Error("Valor inválido");
    this._valor = value;
  }
}