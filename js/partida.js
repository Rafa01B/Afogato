import { ComputacaoBiblioteca } from "./categorias/computacao.js";
import { FrutaBiblioteca } from "./categorias/frutas.js";
import { PaisBiblioteca } from "./categorias/paises.js";
import { AnimalBiblioteca } from "./categorias/animais.js";
import { Termo } from "./termo.js";

export class Partida {
  constructor(jogo) {
    this.jogo = jogo;
    this.letrasVerdes = [];
    this.letrasErradas = [];
    this.status = "em andamento";
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
      case "computacao": this.biblioteca = new ComputacaoBiblioteca(); break;
      case "frutas": this.biblioteca = new FrutaBiblioteca(); break;
      case "paises": this.biblioteca = new PaisBiblioteca(); break;
      case "animais": this.biblioteca = new AnimalBiblioteca(); break;
    }

    this.biblioteca.inicializar();
    this.termo = new Termo(this.biblioteca.sortearPalavra());

    this.letrasVerdes = Array(this.termo.palavra.length).fill("");
    this.tentativas = this.definirTentativas();
    this.dicas = this.definirDicas();

    this.mostrarStatus();
  }

  definirTentativas() {
    const tam = this.termo.palavra.length;
    if (tam <= 5) {
      return 7;
    }
    if (tam <= 7) {
      return 10;
    }
    else {
      return 15;
    }
  }

  definirDicas() {
    const tam = this.termo.palavra.length;

    if (tam <= 5) {
      return 1;
    }
    else if (tam <= 7) {
      return 2;
    } else {
      return 3;
    }

  }

  mostrarStatus() {
    const letras = this.letrasVerdes.map(l => l ? `<span class="letra-verde">${l}</span>` : "_").join(" ");

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
    this.atualizarImagem();
  }

  tentarLetra() {
    const letra = prompt("Digite uma letra:").toUpperCase();
    if (!letra.match(/^[A-Z]$/)) {
      alert("Letra inválida!");
      return;
    }

    if (this.letrasErradas.includes(letra) || this.letrasVerdes.includes(letra)) {
      alert("Você já tentou essa letra!");
      return;
    }

    let acertou = false;
    for (let i = 0; i < this.termo.palavra.length; i++) {
      if (this.termo.palavra[i] === letra) {
        this.letrasVerdes[i] = letra;
        acertou = true;
      }
    }

    if (!acertou) {
      this.letrasErradas.push(letra);
    }

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
      alert("Sem dicas disponíveis!");
      return;
    }

    const palavra = this.termo.palavra;
    for (let i = 0; i < palavra.length; i++) {
      if (!this.letrasVerdes[i]) {
        this.letrasVerdes[i] = palavra[i];
        this.dicas--;
        this.tentativas--;
        this.verificarFim();
        return;
      }
    }
  }

  atualizarImagem() {
    const img = document.getElementById("gatinho");
    if (!img) return;

    if (this.status === "VITÓRIA") {
      img.src = "assets/vitoria.png";
    } else if (this.status === "DERROTA") {
      img.src = "assets/derrota.png";
    } else {
      const metade = Math.floor(this.definirTentativas() / 2);
      if (this.tentativas <= metade) {
        img.src = "assets/medio.png";
      } else {
        img.src = "assets/alfredo.png";
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
    this.status = "VITÓRIA";
    this.fim = new Date();
    this.jogo.salvarPartida(this);
    this.atualizarImagem();
    this.mostrarMensagemFinal("🎉 Parabéns! Você salvou o Alfredo!");
  }

  perder() {
    this.status = "DERROTA";
    this.fim = new Date();
    this.jogo.salvarPartida(this);
    this.atualizarImagem();
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
    return { seg: Math.floor(duracao % 60), min: Math.floor(duracao / 60) };
  }

  get tempoTotalSegundos() {
    return ((this.fim || new Date()) - this.inicio) / 1000;
  }

  toString() {
    const tempo = this.tempoTotal();
    return `Status: ${this.status} | Palavra: ${this.termo.palavra} | Tempo: ${tempo.min}m ${tempo.seg}s`;
  }
}
