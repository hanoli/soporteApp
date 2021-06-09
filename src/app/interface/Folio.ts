import { Cliente } from "./Cliente";

export class Folio {
  id: number;
  folio: String;
  fecha: Date;
  tipoEquipo: String;
  marca: String;
  modelo: String;
  numSerie: String;
  cliente:Cliente;
}