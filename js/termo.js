// js/termo.js
export class Termo {
  constructor(palavra) {
    this.palavra = palavra.toUpperCase(); 
  }

  validarLetra(letra, posicao) {
    letra = letra.toUpperCase();

    if (this.palavra[posicao] === letra) {
      return 2; 
    }

    if (this.palavra.includes(letra)) {
      return 1; 
    }

    return -1; 
  }
}
