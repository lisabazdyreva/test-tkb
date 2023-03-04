
const dataTable = document.querySelector('.data-table').querySelector('tbody');

const addDataButton = document.querySelector('.action-button--add');
const newRow = document.querySelector('#new-row').content.querySelector('.data-table__body-row');

const removeButtons = document.querySelectorAll('.remove-data-button');

const postDataButton = document.querySelector('.action-button--post');


const validity = {
  isNameValid: false,
  isJobTitleValid: false,
  isAgeValid: false,
  isCompetenciesValid: false,
};


//2. Валидировать ввод

// имя
newRow.querySelector('#name').addEventListener('input', (evt) => {
    if (evt.target.value.trim()) {
      validity.isNameValid = true;
    }

  if (validity.isNameValid && validity.isAgeValid  && validity.isCompetenciesValid) {
    newRow.querySelector('.save-data-button').disabled = false;
  }
});


// возраст
newRow.querySelector('#age').addEventListener('input', (evt) => {
  if (Number(evt.target.value)) {
    validity.isAgeValid = true;
  }

  if (validity.isNameValid && validity.isAgeValid  && validity.isCompetenciesValid) {
    newRow.querySelector('.save-data-button').disabled = false;
  }
});

// компетенции
newRow.querySelector('#competencies').addEventListener('input', (evt) => {
  if (evt.target.value.trim()) {
    validity.isCompetenciesValid = true;
  }

  if (validity.isNameValid && validity.isAgeValid  && validity.isCompetenciesValid) {
    newRow.querySelector('.save-data-button').disabled = false;
  }
});

const buttonCancel = document.createElement('button');
buttonCancel.type = 'button';
buttonCancel.classList.add('action-button');
buttonCancel.classList.add('action-button--cancel');
buttonCancel.innerText = 'Отменить';
//1. Добавлять новую строку, если не открыта уже строка


buttonCancel.addEventListener('click', () => {
  newRow.remove();
  addDataButton.disabled = false;
  postDataButton.disabled = false;
  addDataButton.style.display = 'inline-block';

  buttonCancel.remove();
});


addDataButton.addEventListener('click', () => {
  addDataButton.disabled = true;
  postDataButton.disabled = true;

  if (document.querySelector('.data-table__body-row--new')) {
    return;
  }

  dataTable.append(newRow);
  newRow.querySelector('.save-data-button').disabled = true;
  // обработчики ввода


  addDataButton.parentNode.append(buttonCancel)
  addDataButton.style.display = 'none';
});



//4. По кнопке добавить строку в таблицу
newRow.querySelector('.save-data-button').addEventListener('click', () => {
  const name = newRow.querySelector('#name').value;
  // const jobTitle = newRow
  const age = newRow.querySelector('#age').value;
  const competencies = newRow.querySelector('#competencies').value;

  const tdName = document.createElement('td');
  tdName.textContent = name;

  const tdJobTitle = document.createElement('td');
  tdJobTitle.textContent = 'Аналитик';

  const tdAge = document.createElement('td');
  tdAge.textContent = age;

  const tdCompetencies = document.createElement('td');
  tdCompetencies.textContent = competencies;

  newRow.remove();

  const tdRemoveButton = document.createElement('td');
  tdRemoveButton.innerHTML = `<button class="remove-data-button" type="button">Del</button>`;

  const trNew = document.createElement('tr');
  trNew.classList.add('data-table__body-row');

  const idForRow = dataTable.querySelectorAll('tr').length;
  trNew.id = `${idForRow }-row`;

  trNew.append(tdName);
  trNew.append(tdJobTitle);
  trNew.append(tdAge);
  trNew.append(tdCompetencies);
  trNew.append(tdRemoveButton);

  dataTable.append(trNew);
  addDataButton.disabled = false;
  postDataButton.disabled = false;
});


//3. По кнопке удалять строку
removeButtons.forEach((removeButton) => {
  removeButton.addEventListener('click', (evt) => {
    const rowToRemove = evt.currentTarget.parentNode.parentNode;

    if (rowToRemove) {
      rowToRemove.remove();
    }
  });
});


//5. Отправить джейсон с полями

postDataButton.addEventListener('click', () => {
  const rows = dataTable.querySelectorAll('tr');

  const dataObject = {};

  rows.forEach((row) => {
    const dataRow = {};

    dataRow['name'] = row.children[0].innerText;
    dataRow['jobTitle'] = row.children[1].innerText;
    dataRow['age'] = Number(row.children[2].innerText);
    dataRow['competencies'] = row.children[3].innerHTML;

    dataObject[parseInt(row.id)] = dataRow;
  });

  const jsonData = JSON.stringify(dataObject);

  console.log(jsonData);
});


let isMenuOpen = true;

const buttonMenuOpen = document.querySelector('.header__menu-button');
const mainNav = document.querySelector('.main-nav'); //--close

buttonMenuOpen.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mainNav.classList.remove('main-nav--close');
    document.body.classList.add('body--nav-open');
  } else {
    mainNav.classList.add('main-nav--close');
    document.body.classList.remove('body--nav-open');
  }

});