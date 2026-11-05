const billInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('customTip');
const peopleInput = document.getElementById('people');
const decPeople = document.getElementById('decPeople');
const incPeople = document.getElementById('incPeople');
const peopleError = document.getElementById('peopleError');
const tipPerPersonEl = document.getElementById('tipPerPerson');
const totalPerPersonEl = document.getElementById('totalPerPerson');
const resetBtn = document.getElementById('resetBtn');

let tipPercent = 10;

function calculate() {
  const bill = parseFloat(billInput.value) || 0;
  const people = parseInt(peopleInput.value, 10);

  if (isNaN(people) || people <= 0) {
    peopleError.style.display = 'block';
    peopleInput.style.borderColor = 'var(--error)';
    tipPerPersonEl.textContent = '$0.00';
    totalPerPersonEl.textContent = '$0.00';
    return;
  }

  peopleError.style.display = 'none';
  peopleInput.style.borderColor = '';

  const totalTip = (bill * tipPercent) / 100;
  const tipPerPerson = totalTip / people;
  const totalPerPerson = (bill + totalTip) / people;

  tipPerPersonEl.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPerPersonEl.textContent = `$${totalPerPerson.toFixed(2)}`;

  resetBtn.disabled = bill === 0 && people === 1 && tipPercent === 10;
}

tipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tipButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    customTipInput.value = '';
    tipPercent = parseFloat(btn.dataset.tip);
    calculate();
  });
});

customTipInput.addEventListener('input', () => {
  tipButtons.forEach(b => b.classList.remove('active'));
  tipPercent = parseFloat(customTipInput.value) || 0;
  calculate();
});

billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

decPeople.addEventListener('click', () => {
  let val = parseInt(peopleInput.value, 10) || 1;
  if (val > 1) {
    peopleInput.value = val - 1;
    calculate();
  }
});

incPeople.addEventListener('click', () => {
  let val = parseInt(peopleInput.value, 10) || 1;
  peopleInput.value = val + 1;
  calculate();
});

resetBtn.addEventListener('click', () => {
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '1';
  tipButtons.forEach(b => b.classList.remove('active'));
  tipButtons[1].classList.add('active');
  tipPercent = 10;
  calculate();
});

calculate();
