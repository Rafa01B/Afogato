import { Partida } from './partida.js';

export class Jogo {
  constructor() {
    this.partidas = [];
    this.container = document.getElementById("conteudo");
    this.img = document.getElementById("gatinho");

  }

  limparTela() {
    this.container.innerHTML = "";
  }

  verRegras() {
    this.limparTela();

    this.container.innerHTML = `
      <h2>📜 Regras do Afogato</h2>
      <p>Salve o Alfredo antes que ele seja AFOGATO!</p>
      <ul style="text-align: left;">
        <li>🎯 Escolha uma categoria: Computação, Fruta, País ou Animal.</li>
        <li>🎯 O jogo vai sortear uma palavra dessa categoria.</li>
        <li>🎯 Você pode tentar adivinhar uma letra e sua posição.</li>
        <li>🎯 Se acertar, a letra aparece; se errar, perde uma tentativa.</li>
        <li>🎯 Pode tentar adivinhar a palavra inteira — mas se errar, perde!</li>
      </ul>
    `;

    this.img.src = "assets/alfredo.png";

  }

  iniciarPartida() {
    this.limparTela();
    const partida = new Partida(this);
    partida.iniciar();
    this.partidas.push(partida);
  }

  verHistorico() {
    this.limparTela();

    if (this.partidas.length === 0) {
      this.container.innerHTML = "<p>Ainda não há partidas jogadas!</p>";
      return;
    }

    this.container.innerHTML = "<h2>📁 Partidas Anteriores</h2>";

    this.partidas.forEach((partida, i) => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>Partida ${i + 1}:</strong> ${partida.toString()}`;
      this.container.appendChild(div);
    });
    this.img.src = "assets/alfredo.png";

  }

  verRanking() {
    this.limparTela();

    const vitorias = this.partidas.filter(p => p.status === "VITÓRIA");

    if (vitorias.length === 0) {
      this.container.innerHTML = "<p>🏆 Ainda não há partidas com vitória!</p>";
      return;
    }

    this.container.innerHTML = "<h2>🏆 Ranking</h2>";

    vitorias.sort((a, b) => a.tempoTotalSegundos - b.tempoTotalSegundos);

    vitorias.forEach((partida, i) => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${i + 1}º lugar:</strong> ${partida.toString()}`;
      this.container.appendChild(div);
    });
    this.img.src = "assets/alfredo.png";

  }
}
