document.addEventListener('DOMContentLoaded', () => {
    // Seletores de tela
    const sectionHome = document.getElementById('home');
    const sectionApp = document.getElementById('app');
    
    // Botões de navegação
    const btnIniciar = document.getElementById('btnIniciar');
    const btnVoltar = document.getElementById('btnVoltar');
    const logoHome = document.getElementById('logoHome');

    // Função para mostrar reservas
    btnIniciar.addEventListener('click', () => {
        sectionHome.classList.add('hidden');
        sectionApp.classList.remove('hidden');
    });

    // Função para voltar ao início
    const voltarInicio = () => {
        sectionApp.classList.add('hidden');
        sectionHome.classList.remove('hidden');
    };

    btnVoltar.addEventListener('click', voltarInicio);
    logoHome.addEventListener('click', voltarInicio);

    // --- Lógica do Formulário (Mantida do anterior) ---
    const form = document.getElementById('formReserva');
    const inputData = document.getElementById('data');
    const inputID = document.getElementById('identificador');
    const modal = document.getElementById('modalSucesso');
    const resumo = document.getElementById('resumoReserva');

    const hoje = new Date().toISOString().split('T')[0];
    inputData.setAttribute('min', hoje);

    inputID.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const dataFormatada = inputData.value.split('-').reverse().join('/');
        
        resumo.innerHTML = `
            <p><strong>Responsável:</strong> ${document.getElementById('nome').value}</p>
            <p><strong>Local:</strong> ${document.getElementById('sala').value}</p>
            <p><strong>Data/Hora:</strong> ${dataFormatada} às ${document.getElementById('horario').value}</p>
        `;

        modal.showModal();
        form.reset();
        inputData.setAttribute('min', hoje);
    });
});