export class AnimalBiblioteca {
  inicializar() {
    this.palavras = [
      "Gato", "Cachorro", "Rato", "Galinha", "Papagaio",
      "Macaco", "Tigre", "Urso", "Pinguim", "Canguru"
    ];
  }

  sortearPalavra() {
    return this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }
}
