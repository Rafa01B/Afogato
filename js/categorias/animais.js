export class AnimalBiblioteca {
  inicializar() {
    this.palavras = [
  "Gato", "Cachorro", "Rato", "Galinha", "Papagaio","Macaco", "Tigre", "Urso", "Pinguim", "Canguru",
  "Elefante", "Girafa", "Zebra", "Coelho", "Lobo", "Raposa", "Cavalo", "Vaca", "Porco",
  "Bode", "Ovelha", "Cobra", "Tartaruga", "Crocodilo", "Arara", "Coruja", "Pato", "Polvo", "Golfinho",
  "Baleia", "Peixe", "Sapo", "Rinoceronte", "Leopardo", "Ornitorrinco", "Morcego"
];
  }

  sortearPalavra() {
    return this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }
}
