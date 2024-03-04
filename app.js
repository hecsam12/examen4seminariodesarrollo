const form = document.getElementById('formRegister');
const nameInput = document.getElementById('nameInput');
const edadInput = document.getElementById('edadInput');
const emailInput = document.getElementById('emailInput');
const generoInput = document.getElementById('generoInput');
const interesesInput = document.getElementById('interesesInput');
const comentariosInput = document.getElementById('comentariosInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let expresion;
    expresion = /\w+@\w+\.+[a-z]/;

    const name = nameInput.value;
    const edad = edadInput.value;
    const email = emailInput.value;
    const genero = generoInput.value;
    const intereses = interesesInput.value;
    const comentarios = comentariosInput.value;

    if (name && edad && email && genero && intereses && comentarios) {
        const newData = { name, edad, email, genero, intereses, comentarios };
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    } else if (name === "" || edad === "" || email === "") {
        alert('Verificar que los campos "Nombre", "Edad" o "Email" no esten vacios')
    }
    else if (!expresion.test(email)) {
        alert('El correo no es válido');
    } else if (isNaN(edad)) {
        alert('Edad debe de ser númerico');
    }
})

function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function (item, index) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const edadCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const generoCell = document.createElement('td');
        const interesesCell = document.createElement('td');
        const comentariosCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        nameCell.textContent = item.name;
        edadCell.textContent = item.edad;
        emailCell.textContent = item.email;
        generoCell.textContent = item.genero;
        interesesCell.textContent = item.intereses;
        comentariosCell.textContent = item.comentarios;
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        editButton.classList.add("button", 'button--secondary');
        deleteButton.classList.add("button", 'button--tertiary');

        editButton.addEventListener('click', function () {
            editData(index);
        })

        deleteButton.addEventListener('click', function () {
            deleteData(index);
        })

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton)

        row.appendChild(nameCell);
        row.appendChild(edadCell);
        row.appendChild(emailCell);
        row.appendChild(generoCell);
        row.appendChild(interesesCell);
        row.appendChild(comentariosCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    })
}

function editData(index) {
    const item = data[index];
    nameInput.value = item.name;
    edadInput.value = item.edad;
    emailInput.value = item.email;
    generoInput.value = item.genero;
    interesesInput.value = item.intereses;
    comentariosInput.value = item.comentarios;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();