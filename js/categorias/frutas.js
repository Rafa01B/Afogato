export class FrutaBiblioteca {
  inicializar() {
    this.palavras = [
      "Uva", "Coco", "Laranja", "Goiaba", "Banana",
      "Figo", "Abacate", "Morango", "Graviola", "Manga"
    ];
  }

  sortearPalavra() {
    return this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }
}
