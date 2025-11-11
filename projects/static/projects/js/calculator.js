document.addEventListener('DOMContentLoaded', () => {
  const dataEl = document.getElementById('project-data');

  if (!dataEl) {
    console.error("Данные проекта не найдены.");
    return;
  }

  const basePrice = parseFloat(dataEl.dataset.basePrice);
  const areaTotal = parseFloat(dataEl.dataset.areaTotal);
  const stages = JSON.parse(dataEl.dataset.stages);
  const techCoefficients = JSON.parse(dataEl.dataset.techCoefficients);

  window.projectData = { basePrice, areaTotal, stages, techCoefficients };

  initializeCalculator();
});

let selectedTech = 'frame';
let total = 0;

function initializeCalculator() {
  total = window.projectData.basePrice;
  renderStages();
  attachEventListeners();
  calculateTotal();
}

function renderStages() {
  const table = document.querySelector('.cost-table');
  table.innerHTML = '';

  window.projectData.stages.forEach((stage, index) => {
    const row = document.createElement('div');
    row.className = `stage-row ${stage.isRequired ? 'required' : 'optional'}`;

    row.innerHTML = `
      <div class="stage-number">${index + 1}/${window.projectData.stages.length}</div>
      <div class="stage-title">${stage.title}</div>
      <div class="stage-description">${stage.description}</div>
      <div class="stage-price">
        ${stage.isRequired
          ? '<span class="required-check">✓</span><span class="price-text">Обязательно</span>'
          : `<input type="checkbox" class="stage-check" data-stage-id="${stage.id}">
             <span class="price-text">Выбрать</span>`
        }
      </div>
    `;

    table.appendChild(row);
  });
}

function attachEventListeners() {
  // Переключение технологии
  document.querySelectorAll('.tech-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tech-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTech = btn.dataset.tech;
      calculateTotal();
    });
  });

  // Переключение опциональных этапов
  document.querySelectorAll('.stage-check').forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotal);
  });

  // Сброс
  document.getElementById('reset-btn').addEventListener('click', () => {
    document.querySelectorAll('.stage-check').forEach(cb => cb.checked = false);
    calculateTotal();
  });
}

function calculateTotal() {
  const techCoefficient = window.projectData.techCoefficients[selectedTech];
  total = window.projectData.basePrice * techCoefficient;

  document.querySelectorAll('.stage-check:checked').forEach(checkbox => {
    const stageId = parseInt(checkbox.dataset.stageId);
    const stage = window.projectData.stages.find(s => s.id === stageId);

    if (stage) {
      const costPerSqm = stage.costPerSqm;
      const totalPrice = costPerSqm * window.projectData.areaTotal;

      if (!isNaN(totalPrice)) {
        total += totalPrice;
      }
    }
  });

  document.getElementById('total-amount').textContent = total.toLocaleString('ru-RU') + ' ₽';
}