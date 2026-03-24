import { Endereco } from "./Endereco";
import { Telefone } from "./Telefone";

export class Cliente {
  private _nome: string;
  private _cpf: number;
  private _dataNascimento: number;
  private _sexo: string;
  private _endereco: Endereco;
  private _telefones: Telefone[];

  constructor(
    nome: string,
    cpf: number,
    dataNascimento: number,
    sexo: string,
    endereco: Endereco,
    telefones: Telefone[]
  ) {
    this._nome = nome;
    this._cpf = cpf;
    this._dataNascimento = dataNascimento;
    this._sexo = sexo;
    this._endereco = endereco;
    this._telefones = telefones;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get cpf(): number {
    return this._cpf;
  }

  set cpf(value: number) {
    if (value.toString().length !== 11) {
      throw new Error("CPF inválido");
    }
    this._cpf = value;
  }

  get dataNascimento(): number {
    return this._dataNascimento;
  }

  set dataNascimento(value: number) {
    this._dataNascimento = value;
  }

  get sexo(): string {
    return this._sexo;
  }

  set sexo(value: string) {
    this._sexo = value;
  }

  get endereco(): Endereco {
    return this._endereco;
  }

  set endereco(value: Endereco) {
    this._endereco = value;
  }

  get telefones(): Telefone[] {
    return this._telefones;
  }

  set telefones(value: Telefone[]) {
    this._telefones = value;
  }

  adicionarTelefone(telefone: Telefone): void {
    this._telefones.push(telefone);
  }
}