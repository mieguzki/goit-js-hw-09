const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedData) {
  emailInput.value = savedData.email || '';
  messageInput.value = savedData.message || '';
}

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormInput);

function onFormInput(event) {
  const { name, value } = event.target;
  saveFormDataToStorage(name, value);
}

function saveFormDataToStorage(name, value) {
  const formData = loadFormDataFromStorage();
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormDataFromStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : {};
}

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = loadFormDataFromStorage();

  if (!email || !message) {
    return alert('Будь ласка, заповніть обидва поля.');
  }

  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}