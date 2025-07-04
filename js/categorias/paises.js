export class PaisBiblioteca {
  inicializar() {
    this.palavras = [
      "Brasil", "Peru", "Chile", "China", "Argentina",
      "Espanha", "Alemanha", "Inglaterra", "Angola", "Cuba"
    ];
  }

  sortearPalavra() {
    return this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }
}
