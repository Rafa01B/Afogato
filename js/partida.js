// js/partida.js
import { ComputacaoBiblioteca } from "./categorias/computacao.js";
import { FrutaBiblioteca } from "./categorias/frutas.js";
import { PaisBiblioteca } from "./categorias/paises.js";
import { AnimalBiblioteca } from "./categorias/animais.js";
import { Termo } from "./termo.js";

export class Partida {
  constructor(jogo) {
    this.jogo = jogo;

    this.letrasVerdes = [];
    this.letrasAmarelas = [];
    this.letrasErradas = [];

    this.status = "em andamento"; // vitória ou derrota
    this.inicio = new Date();
    this.fim = null;
  }

  iniciar() {
    const html = `
      <h2>🎮 Escolha uma categoria:</h2>
      <select id="categoria">
        <option value="computacao">Computação</option>
        <option value="frutas">Fruta</option>
        <option value="paises">País</option>
        <option value="animais">Animal</option>
      </select>
      <br/><br/>
      <button id="confirmarCategoria">Confirmar</button>
    `;

    this.jogo.container.innerHTML = html;

    document.getElementById("confirmarCategoria").onclick = () => {
      const categoria = document.getElementById("categoria").value;
      this.setupCategoria(categoria);
    };
  }

  setupCategoria(categoria) {
    switch (categoria) {
      case "computacao":
        this.biblioteca = new ComputacaoBiblioteca();
        break;
      case "frutas":
        this.biblioteca = new FrutaBiblioteca();
        break;
      case "paises":
        this.biblioteca = new PaisBiblioteca();
        break;
      case "animais":
        this.biblioteca = new AnimalBiblioteca();
        break;
    }

    this.biblioteca.inicializar();
    this.termo = new Termo(this.biblioteca.sortearPalavra());
    this.letrasVerdes = Array(this.termo.palavra.length).fill("");
    this.letrasAmarelas = Array(this.termo.palavra.length).fill("");

    this.tentativas = this.definirTentativas();
    this.dicas = this.definirDicas();

    this.mostrarStatus();
  }

  definirTentativas() {
    const tam = this.termo.palavra.length;
    if (tam <= 5) return 7;
    if (tam <= 7) return 10;
    return 15;
  }

  definirDicas() {
    const tam = this.termo.palavra.length;
    if (tam <= 5) return 1;
    if (tam <= 7) return 2;
    return 3;
  }

  mostrarStatus() {
    const letras = this.letrasVerdes
      .map((letra, i) => {
        if (letra) return `<span class="letra-verde">${letra}</span>`;
        if (this.letrasAmarelas[i]) return `<span class="letra-amarela">${this.letrasAmarelas[i]}</span>`;
        return "_";
      })
      .join(" ");

    const html = `
      <h3>Palavra: ${letras}</h3>
      <p>Tentativas restantes: ${this.tentativas}</p>
      <p>Dicas disponíveis: ${this.dicas}</p>

      <div>
        <button onclick="partida.tentarLetra()">Tentar Letra</button>
        <button onclick="partida.chutarPalavra()">Chutar Palavra</button>
        <button onclick="partida.usarDica()">Usar Dica</button>
      </div>

      <div class="erros">
        <p>Letras erradas: ${this.letrasErradas.map(l => `<span class="letra-vermelha">${l}</span>`).join(" ")}</p>
      </div>
    `;

    this.jogo.container.innerHTML = html;

    window.partida = this;
  }

  tentarLetra() {
    const letra = prompt("Digite uma letra:").toUpperCase();
    const pos = parseInt(prompt("Digite a posição (1 a " + this.termo.palavra.length + "):")) - 1;

    if (isNaN(pos) || pos < 0 || pos >= this.termo.palavra.length || !letra.match(/[A-Z]/)) {
      alert("Letra ou posição inválida.");
      return;
    }

    const status = this.termo.validarLetra(letra, pos);

    if (status === 2) this.letrasVerdes[pos] = letra;
    else if (status === 1) this.letrasAmarelas[pos] = letra;
    else this.letrasErradas.push(letra);

    this.tentativas--;
    this.verificarFim();
  }

  chutarPalavra() {
    const chute = prompt("Qual seu chute para a palavra?").toUpperCase();

    if (chute === this.termo.palavra) {
      this.vencer();
    } else {
      this.perder();
    }
  }

 usarDica() {
  if (this.dicas <= 0) {
    alert("Você não tem mais dicas.");
    return;
  }

  const palavra = this.termo.palavra;

  for (let i = 0; i < palavra.length; i++) {
    if (!this.letrasVerdes[i]) {
      const letra = palavra[i];
      this.letrasVerdes[i] = letra;
      this.dicas--;
      this.tentativas--;
      this.verificarFim();
      return;
    }
  }
}

  verificarFim() {
    if (this.letrasVerdes.join("") === this.termo.palavra) {
      this.vencer();
    } else if (this.tentativas <= 0) {
      this.perder();
    } else {
      this.mostrarStatus();
    }
  }

  vencer() {
    this.status = "vitória";
    this.fim = new Date();
    this.mostrarMensagemFinal("🎉 Parabéns! Você salvou o Alfredo!");
  }

  perder() {
    this.status = "derrota";
    this.fim = new Date();
    this.mostrarMensagemFinal(`💀 Você perdeu! A palavra era: ${this.termo.palavra}`);
  }

  mostrarMensagemFinal(msg) {
    const tempo = this.tempoTotal();
    this.jogo.container.innerHTML = `
      <h2>${msg}</h2>
      <p>Status: ${this.status}</p>
      <p>Tempo: ${tempo.min}m ${tempo.seg}s</p>
      <button onclick="jogo.iniciarPartida()">Jogar Novamente</button>
      <button onclick="jogo.verHistorico()">Ver Histórico</button>
    `;
  }

  tempoTotal() {
    const duracao = ((this.fim || new Date()) - this.inicio) / 1000;
    return {
      seg: Math.floor(duracao % 60),
      min: Math.floor(duracao / 60),
    };
  }

  get tempoTotalSegundos() {
    return ((this.fim || new Date()) - this.inicio) / 1000;
  }

  toString() {
    const tempo = this.tempoTotal();
    return `Status: ${this.status} | Palavra: ${this.termo.palavra} | Tempo: ${tempo.min}m ${tempo.seg}s`;
  }
}