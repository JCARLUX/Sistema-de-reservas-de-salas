// Seleção de elementos do DOM
const btnIniciar = document.getElementById('btnIniciar');
const sectionHome = document.getElementById('home');
const sectionApp = document.getElementById('app');
const form = document.getElementById('formReserva');
const inputData = document.getElementById('data');
const modal = document.getElementById('modalSucesso');
const resumo = document.getElementById('resumoReserva');
const btnVoltar = document.getElementById('btnVoltar');
const logoHome = document.getElementById('logoHome');

// 1. Bloqueio de datas passadas
const hoje = new Date().toISOString().split('T')[0];
inputData.setAttribute('min', hoje);

// 2. Transição de telas
function mostrarApp() {
    sectionHome.classList.add('hidden');
    sectionApp.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function mostrarHome() {
    sectionApp.classList.add('hidden');
    sectionHome.classList.remove('hidden');
}

btnIniciar.addEventListener('click', mostrarApp);
btnVoltar.addEventListener('click', mostrarHome);
logoHome.addEventListener('click', mostrarHome);

// 3. Envio do Formulário com EmailJS
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Feedback visual no botão
    const btnConfirmar = document.querySelector('.btn-confirmar');
    const textoOriginal = btnConfirmar.innerText;
    btnConfirmar.innerText = "Enviando...";
    btnConfirmar.disabled = true;

    // Organiza os dados para o template do EmailJS
    const templateParams = {
        nome: document.getElementById('nome').value,
        identificador: document.getElementById('identificador').value,
        sala: document.getElementById('sala').value,
        data: inputData.value.split('-').reverse().join('/'),
        horario: document.getElementById('horario').value
    };

    // DISPARO DO E-MAIL USANDO SEUS IDs
    emailjs.send('service_tpjz4r2', 'template_vvr6l4b', templateParams)
        .then(() => {
            // Se o e-mail for enviado com sucesso, mostra o modal
            resumo.innerHTML = `
                <p><strong>Responsável:</strong> ${templateParams.nome}</p>
                <p><strong>Local:</strong> ${templateParams.sala}</p>
                <p><strong>Data:</strong> ${templateParams.data} às ${templateParams.horario}</p>
                <hr style="margin: 15px 0; opacity: 0.2;">
                <p style="color: #27ae60; font-weight: bold; text-align: center;">
                   ✓ Notificação enviada para o seu celular!
                </p>
            `;
            modal.showModal();
            form.reset();
        })
        .catch((error) => {
            console.error('Erro ao enviar e-mail:', error);
            alert("Erro ao processar reserva. Verifique sua conexão e tente novamente.");
        })
        .finally(() => {
            // Restaura o botão original
            btnConfirmar.innerText = textoOriginal;
            btnConfirmar.disabled = false;
        });
});