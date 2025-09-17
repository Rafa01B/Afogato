export class ComputacaoBiblioteca {
  inicializar() {
   this.palavras = [
  "Java", "Python", "JavaScript","React", "Node", "Express", "Backend", "Frontend","API", "Compilador",
   "Interpretador", "Classe", "Objeto", "Interface", "Framework", "Biblioteca", "Debug", "Servidor", 
   "Loop", "Array", "String", "Boolean", "Int", "Float", "Double", "Package", "Void", "Processador", "Programa",
   "Linguagem", "IDE", "Rede", "Buffer", "Sistema", "Servidor", "Linux", "Windows", "Dados"
];

  }

  sortearPalavra() {
    return this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }
}
