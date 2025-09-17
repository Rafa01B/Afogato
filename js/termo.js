export class Termo {
  constructor(palavra) {
    this.palavra = palavra.toUpperCase();
  }

  letraCorreta(letra, posicao) {
    return this.palavra[posicao] === letra.toUpperCase();
  }
}

