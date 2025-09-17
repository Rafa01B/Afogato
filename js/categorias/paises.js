export class PaisBiblioteca {
  inicializar() {
    this.palavras = [
  "Brasil", "Peru", "Chile", "China", "Argentina", "Espanha", "Alemanha", "Inglaterra", "Angola", "Cuba",
  "Turquia", "Egito", "Marrocos", "Israel", "Portugal", "Paraguai", "Uruguai", "Venezuela", "Panama", "Honduras",
   "Nicaragua",  "Jamaica", "Haiti", "Filipinas", "Singapura","Laos", "Camboja"
];
}
  sortearPalavra() {
    return this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }
}
