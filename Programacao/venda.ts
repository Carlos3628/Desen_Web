import { Cliente } from "./Cliente";
import { Produto } from "./Produto";

export class Venda {
  private _codigo: number;
  private _data: number;
  private _cliente: Cliente;
  private _produtos: Produto[];

  constructor(
    codigo: number,
    data: number,
    cliente: Cliente,
    produtos: Produto[]
  ) {
    this._codigo = codigo;
    this._data = data;
    this._cliente = cliente;
    this._produtos = produtos;
  }

  get codigo(): number {
    return this._codigo;
  }

  set codigo(value: number) {
    this._codigo = value;
  }

  get data(): number {
    return this._data;
  }

  set data(value: number) {
    this._data = value;
  }

  get cliente(): Cliente {
    return this._cliente;
  }

  set cliente(value: Cliente) {
    this._cliente = value;
  }

  get produtos(): Produto[] {
    return this._produtos;
  }

  set produtos(value: Produto[]) {
    this._produtos = value;
  }

  adicionarProduto(produto: Produto): void {
    this._produtos.push(produto);
  }

  calcularTotal(): number {
    return this._produtos.reduce((total, p) => total + p.valor, 0);
  }
}