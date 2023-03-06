const SKILLS_DESCRIPTION_LIMIT = {
  Min: 120,
  Max: 200,
};

const JOB_TITLE = {
  manager: 'Менеджер',
  analyst: 'Аналитик',
  programmer: 'Программист',
  lawyer: 'Юрист',
};

const dataTableBody = document.querySelector('.data-table').querySelector('tbody');
const postDataButton = document.querySelector('.action-button--post');

const createDataButton = document.querySelector('.action-button--add');
const cancelCreateDataButton =  document.querySelector('.action-button--cancel');

const newRow = document.querySelector('#new-row').content.querySelector('.data-table__body-row');
const removeRowButtons = document.querySelectorAll('.remove-data-button');
const toggleDescriptionButtons = document.querySelectorAll('.description__toggle-button');

let isMenuOpen = true;

const menuShowButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

const searchInput = document.querySelector('.header__search-input');
const searchList = document.querySelector('.header__search-list');
const searchItems = document.querySelector('#search-items').content.querySelectorAll('.header__search-item');
const searchCancelButton = document.querySelector('.header__search-button');


const validity = {
  isNameValid: false,
  isJobTitleValid: false,
  isAgeValid: false,
  isSkillsValid: false,
};

const removeRowButton =
  `<button class="remove-data-button" type="button" title="Удалить">
    <span class="visually-hidden">Удалить сотрудника</span>
    <svg class="remove-data-button__icon" width="10" height="10" aria-hidden="true">
      <use xlink:href="#remove-icon"></use>
    </svg>
  </button>`;

const closeMenu = () => {
  isMenuOpen = false;

  navigation.classList.add('main-nav--close');
  document.body.classList.remove('body--nav-open');
};

const cleanRowInputs = () => {
  newRow.querySelector('#name').value = '';
  newRow.querySelector('#job-title').value = '';
  newRow.querySelector('#age').value = '';
  newRow.querySelector('#skills').value = '';
};

const clearValidity = () => {
  for (let isValid in validity) {
    validity[isValid] = false;
  }
  console.log(validity)
};


const unlockButton = () => {
  newRow.querySelector('.save-data-button').disabled = !(validity.isNameValid && validity.isAgeValid && validity.isSkillsValid && validity.isJobTitleValid);
};

// Валидировать ввод

// имя
newRow.querySelector('#name').addEventListener('input', (evt) => {
  validity.isNameValid = Boolean(evt.target.value.trim().length);
  unlockButton();
});

// должность
newRow.querySelector('#job-title').addEventListener('change', (evt) => {
  if (evt.target.value !== '') {
    validity.isJobTitleValid = evt.target.value !== '';
  }
  unlockButton();
});

// возраст
newRow.querySelector('#age').addEventListener('input', (evt) => {
  validity.isAgeValid = Boolean(Number(evt.target.value));
  unlockButton();
});

// компетенции
newRow.querySelector('#skills').addEventListener('input', (evt) => {
  validity.isSkillsValid = Boolean(evt.target.value.trim().length);
  unlockButton();
});

// Отмена добавления строки
const onClickCancelCreateDataButtonHandler = () => {
  cleanRowInputs();
  clearValidity();
  newRow.remove();


  createDataButton.disabled = false;
  postDataButton.disabled = false;

  createDataButton.style.display = 'inline-block';
  cancelCreateDataButton.style.display = 'none';
};

cancelCreateDataButton.addEventListener('click', onClickCancelCreateDataButtonHandler);


// Добавлять редактирование новой строки, если уже не открыта строка
const onClickCreateDataButtonHandler = () => {
  createDataButton.disabled = true;
  postDataButton.disabled = true;

  if (document.querySelector('.data-table__body-row--new')) {
    return;
  }

  dataTableBody.append(newRow);
  newRow.querySelector('.save-data-button').disabled = true;

  cancelCreateDataButton.style.display = 'inline-block';
  createDataButton.style.display = 'none';

  dataTableBody.scrollTo(0, dataTableBody.scrollHeight);
  newRow.querySelector('input').focus();

  closeMenu();
};

createDataButton.addEventListener('click', onClickCreateDataButtonHandler);


const createSkillTd = (parent) => {
  const competencies = newRow.querySelector('#skills').value;

  const p = document.createElement('p');
  p.classList.add('description');

  if ((competencies.length > SKILLS_DESCRIPTION_LIMIT.Min && competencies.length <= SKILLS_DESCRIPTION_LIMIT.Max)
    || competencies.length <= SKILLS_DESCRIPTION_LIMIT.Min) {
    p.innerText = competencies;
  } else {
    p.classList.add('description-long--close');

    const spanShort = document.createElement('span');
    spanShort.classList.add('description-short');
    spanShort.innerText = competencies.slice(0, SKILLS_DESCRIPTION_LIMIT.Min);

    const spanLong = document.createElement('span');
    spanLong.classList.add('description-long');
    spanLong.innerText = competencies.slice(SKILLS_DESCRIPTION_LIMIT.Min);

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.classList.add('description-toggle-button');

    toggleButton.innerHTML = `<span class="visually-hidden">Открыть полное описание</span>
                    <svg class="description-toggle-button__icon" width="11" height="15" aria-hidden="true" stroke="black" fill="none">
                      <use xlink:href="#expand-icon"></use>
                    </svg>`;

    toggleButton.addEventListener('click', onToggleButtonDescriptionHandler);

    p.append(spanShort);
    p.append(spanLong);
    p.append(toggleButton);
  }
  parent.append(p);

};
// сохранить поле
const onClickSaveDaraButtonHandler = () => {
  const name = newRow.querySelector('#name').value;
  const jobTitle = newRow.querySelector('#job-title').value;
  const age = newRow.querySelector('#age').value;


  const tdName = document.createElement('td');
  tdName.textContent = name;
  tdName.classList.add('name-cell');

  const tdJobTitle = document.createElement('td');
  tdJobTitle.textContent = JOB_TITLE[jobTitle];
  tdJobTitle.classList.add('job-title-cell');

  const tdAge = document.createElement('td');
  tdAge.textContent = age;
  tdAge.classList.add('age-cell');

  const tdSkills = document.createElement('td');
  createSkillTd(tdSkills);
  tdSkills.classList.add('skills-cell');

  cleanRowInputs();
  clearValidity();
  newRow.remove();

  const tdRemoveButton = document.createElement('td');
  tdRemoveButton.innerHTML = removeRowButton;
  tdRemoveButton.classList.add('button-cell');
  tdRemoveButton.querySelector('button').addEventListener('click', removeButtonHandler);

  const trNew = document.createElement('tr');
  trNew.classList.add('data-table__body-row');

  const idForRow = dataTableBody.querySelectorAll('tr').length;
  trNew.id = `${idForRow }-row`;

  trNew.append(tdName);
  trNew.append(tdJobTitle);
  trNew.append(tdAge);
  trNew.append(tdSkills);
  trNew.append(tdRemoveButton);

  dataTableBody.append(trNew);
  createDataButton.disabled = false;
  postDataButton.disabled = false;

  createDataButton.style.display = 'inline-block';
  cancelCreateDataButton.style.display = 'none';
};

// Сохранить и добавить строку в таблицу
newRow.querySelector('.save-data-button').addEventListener('click', onClickSaveDaraButtonHandler);


//Удалить строку
const removeButtonHandler = (evt) => {
  const rowToRemove = evt.currentTarget.parentNode.parentNode;

  if (rowToRemove) {
    rowToRemove.remove();
  }
};
removeRowButtons.forEach((removeButton) => {
  removeButton.addEventListener('click', removeButtonHandler);
});


// Отправить json с полями
  const makeRequest = (json) => {
    fetch('data.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    }).then((response) => response.json())
      .then(({result}) => console.log(result))
      .catch((err) => console.log(err));
  };

//Собрать json
const onClickPostDataButtonHandler = () => {
  const rows = dataTableBody.querySelectorAll('tr');

  const dataObject = {};

  rows.forEach((row) => {
    const dataRow = {};

    dataRow['name'] = row.children[0].innerText;
    dataRow['jobTitle'] = row.children[1].innerText;
    dataRow['age'] = Number(row.children[2].innerText);

    if (row.children[3].children[0].children.length) {
      dataRow['skills'] = `${row.children[3].children[0].children[0].innerText}${row.children[3].children[0].children[1].innerText}`;

    } else {
      dataRow['skills'] = row.children[3].children[0].innerText;
    }

    dataObject[parseInt(row.id)] = dataRow;
  });

  const jsonData = JSON.stringify(dataObject);
  console.log(jsonData)
  makeRequest(jsonData);
};

postDataButton.addEventListener('click', onClickPostDataButtonHandler);

// Переключить видимость меню
const onClickMenuShowButtonHandler = () => {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    navigation.classList.remove('main-nav--close');
    document.body.classList.add('body--nav-open');
  } else {
    navigation.classList.add('main-nav--close');
    document.body.classList.remove('body--nav-open');
  }
};

menuShowButton.addEventListener('click', onClickMenuShowButtonHandler);

// обработка ввода в поле поиска
const onInputSearchHandler = (evt) => {
  if (evt.target.value.trim()) {
    searchItems.forEach((item) => {
      searchList.append(item);
    })
  } else {
    searchList.innerHTML = "";
  }

  const onPressEscapeHandler = (evt) => {
    if (evt.code === 'Escape' || evt.code === 'Esc') {
      searchInput.value = '';
      searchList.innerHTML = "";
    }
    window.removeEventListener('keydown', onPressEscapeHandler);
  };
  window.addEventListener('keydown', onPressEscapeHandler);
};
searchInput.addEventListener('input', onInputSearchHandler);

// отменить ввод в поле поиска
const onClickSearchCancelButtonHandler = () => {
  searchInput.value = '';
  searchList.innerHTML = "";
  searchInput.focus();
};

searchCancelButton.addEventListener('click', onClickSearchCancelButtonHandler );

// обрезать длинный текст в компетенциях
const onToggleButtonDescriptionHandler = (evt) => {
  evt.currentTarget.parentNode.classList.toggle('description__long--close');
};
toggleDescriptionButtons.forEach((button) => {
  button.addEventListener('click', onToggleButtonDescriptionHandler);
});




