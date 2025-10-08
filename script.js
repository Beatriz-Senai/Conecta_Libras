const card = document.getElementById('card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;  // posição do mouse dentro do card
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // calcula o quanto a div deve girar (quanto mais longe do centro, mais gira)
  const rotateX = ((y - centerY) / 20) * -1;
  const rotateY = ((x - centerX) / 20);

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});


// Rolagem suave até a seção "Jornada do Conhecimento" com ajuste para o menu fixo
document.querySelector('.botao').addEventListener('click', function (event) {
  event.preventDefault();
  const destino = document.querySelector('.linhaDoTempo');
  
  // altura do menu fixo
  const offset = 100; // ajuste conforme a altura real do seu header
  
  const destinoPosicao = destino.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: destinoPosicao,
    behavior: 'smooth'
  });
});





const modalAccordion = document.getElementById('modalAccordion');
const modalTitulo = document.getElementById('modalTitulo');
const modalTexto = document.getElementById('modalTexto');
const fecharModal = document.getElementById('fecharModal');
const btnProximo = document.getElementById('proximo');

const etapas = document.querySelectorAll('.etapa');

const etapasInfo = [
  { titulo: "Antiguidade e Idade Média", texto: "A história da comunidade surda é marcada pela luta contra a discriminação e pela busca de reconhecimento da sua identidade e cultura, que inclui a língua de sinais. O tratamento dos surdos variava de culto a morte em diferentes sociedades antigas, mas a educação organizada começou no século XVI com Pedro Ponce de León na Espanha. No Brasil, a educação dos surdos se desenvolveu a partir de 1857 com a fundação do Instituto Nacional de Educação de Surdos (INES), e a Libras foi oficialmente reconhecida em 2002, impulsionada pela atuação da própria comunidade surda. Na Antiguidade, os surdos eram frequentemente encarados como incapazes ou como seres marcados por punição divina. Na Grécia, eram considerados incompetentes, e em alguns locais, como Esparta, podiam ser abandonados à morte. Primeiras Iniciativas Educacionais: Pedro Ponce de León, um monge espanhol, foi um dos primeiros a educar surdos no século XVI, focando na fala e no uso de sinais." },

  { titulo: "Renascimento e Idade Moderna", texto: "Filósofos como Girolamo Cardamo passaram a reconhecer a capacidade de raciocínio dos surdos e sua habilidade para a comunicação escrita e gestual. A criação de escolas para surdos se tornou mais comum, especialmente entre nobres que buscavam garantir o direito à herança dos filhos surdos através da educação. No final do século XIX, o método oralista ganhou força, focando no ensino da fala e da leitura labial, muitas vezes em detrimento das línguas de sinais. No Brasil, a educação de surdos começou formalmente em 1857 com a criação do INES. A adoção do oralismo no INES em 1911 seguiu uma tendência mundial. A partir dos anos 1970 e 1980, a filosofia da comunicação total e o bilinguismo se disseminaram, reconhecendo as línguas de sinais como formas legítimas de comunicação. A luta da comunidade surda culminou na Lei 10.436 de 2002, que reconheceu a Língua Brasileira de Sinais (Libras) como meio legal de comunicação. Hoje, a comunidade surda continua a lutar por acessibilidade, inclusão social e respeito à sua cultura e identidade, celebrando o Dia Nacional dos Surdos em 26 de setembro." },

  { titulo: "Direitos", texto: "Informações detalhadas sobre os Direitos..." },

  { titulo: "Calendário", texto: "Informações detalhadas sobre o Calendário..." },

  { titulo: "Libras", texto: "Informações detalhadas sobre a Libras..." }
];

let pontoAberto = null;

// Cria a linha de progresso
const timeline = document.querySelector('.timeline');
const progress = document.createElement('div');
progress.classList.add('timeline-progress');
timeline.appendChild(progress);

// Função para atualizar modal e linha de progresso
function abrirModal(index) {
  modalTitulo.textContent = etapasInfo[index].titulo;
  modalTexto.textContent = etapasInfo[index].texto;

  // Atualiza ponto ativo
  etapas.forEach((e, i) => e.classList.toggle('ativo', i <= index));

  // Atualiza largura da linha de progresso
  const largura = ((index + 1) / etapas.length) * 100;
  progress.style.width = `${largura}%`;

  // Abre modal
  modalAccordion.classList.remove('ativo');
  setTimeout(() => modalAccordion.classList.add('ativo'), 10);

  pontoAberto = index;
}

// Clicar nos pontos
etapas.forEach((etapa, index) => {
  etapa.addEventListener('click', () => {
    if (pontoAberto === index) {
      modalAccordion.classList.remove('ativo');
      pontoAberto = null;
      return;
    }
    abrirModal(index);
  });
});

// Botão próximo
btnProximo.addEventListener('click', () => {
  if (pontoAberto === null) {
    abrirModal(0);
  } else {
    const proximoIndex = (pontoAberto + 1) % etapas.length; // ciclo contínuo
    abrirModal(proximoIndex);
  }
});

// Fechar modal
fecharModal.addEventListener('click', () => {
  modalAccordion.classList.remove('ativo');
  pontoAberto = null;
});
