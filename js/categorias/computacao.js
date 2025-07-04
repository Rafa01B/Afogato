export class ComputacaoBiblioteca {
  inicializar() {
    this.palavras = [
      "Java", "True", "False", "Arquivo", "Algoritmo",
      "Computador", "Compilador", "Linguagem", "Backend", "Frontend"
    ];
  }

  sortearPalavra() {
    return this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }
}
