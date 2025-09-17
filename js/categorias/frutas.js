export class FrutaBiblioteca {
  inicializar() {
    this.palavras = [
  "Uva", "Coco", "Laranja", "Goiaba", "Banana", "Figo", "Abacate", "Morango", "Graviola", "Manga", "Figo",
  "Melancia", "Pera", "Caju", "Jabuticaba","Pitanga", "Seriguela", "Pinha", "Framboesa", "Jambo", "Pinha",
  "Amora", "Caqui", "Kiwi", "Tangerina", "Pitanga", "Jaca", "Cereja", "Caju", "Acerola", "Abacaxi", "Ameixa",
  "Carambola", "Umbu", "Pitomba", "Cacau", "Groselha", "Pitaya", "Tamarindo"
];

  }

  sortearPalavra() {
    return this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }
}
