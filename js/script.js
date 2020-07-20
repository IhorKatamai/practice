// Array with test data
const DATA = [ 
    {
        id: 1,
        firstName: 'Petro',
        lastName: 'Boyko',
        createdDate: '10/20/20',
        position: 'HR'
    },
    {
        id: 2,
        firstName: 'Julia',
        lastName: 'Kornuta',
        createdDate: '1/1/20',
        position: 'Back-end Developer'
    },
    {
        id: 3,
        firstName: 'Eduard',
        lastName: 'Sobotnyk',
        createdDate: '5/15/20',
        position: 'Full Stack Developer'
    },
];

// Populate columns titles array
function getKeys(arr) {
    let keysArr = [];
    for (key in arr[0]) {
        if (key == 'id') {
            keysArr.push({title: key, class: 'font-weight-bold'});
        } 
        else {
            keysArr.push({title: key});
        }
    }
    keysArr.push({title: 'operate'});
    return keysArr;
}

function createTable(arr) {
    document.querySelector('#table-wrap').innerHTML='<table id="dataTable" class="table table-bordered mt-5"><thead><tr></tr></thead><tbody></tbody></table>';
    var tableRef = document.getElementById('dataTable');
    var tr = tableRef.tHead.children[0];
    let keys = getKeys(arr);
    for (let i = 0; i < keys.length; i++) {
        tr.insertCell().outerHTML = `<th>${keys[i].title.toUpperCase()}</th>`;
    }
    for (let i = 0; i < arr.length; i++) {
        var newRow = tableRef.insertRow();
        for (let j = 0; j < keys.length; j++) {
            var newCell = newRow.insertCell();
            if (keys[j].class != undefined) {
                newCell.classList.add(keys[j].class);
            }
            var newText = document.createTextNode(arr[i][keys[j].title]);
            newCell.appendChild(newText);
        }
    }
}

createTable(DATA);

// Add new user
function addNewUser() {
    const user = {id:'', firstName:'', lastName:'', createdDate:'', position:''};
    user.id = DATA.length + 1;
    user.firstName = document.getElementById("firstName").value;
    user.lastName = document.getElementById("lastName").value;
    var d = new Date();
    user.createdDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear().toString().slice(-2)}`
    user.position = document.getElementById("position").value;
    DATA.push(user);
    document.getElementById('dataTable').remove();
    createTable(DATA);
}

document.querySelectorAll('[data-save="modal"]').forEach(function(element) {
    element.onclick = () => {
        addNewUser();
        hideModal()
    }
})

// Modal
document.querySelectorAll('[data-toggle="modal"]').forEach(function(element) {
    element.onclick = showModal;
})

document.querySelectorAll('[data-dismiss="modal"]').forEach(function(element) {
    element.onclick = hideModal;
})

document.querySelectorAll('.modal').forEach(function(element) {
    element.onclick = hideModal;
})

function showModal() {
    document.querySelector(this.dataset.target).style.display = 'block';
    document.onkeydown = function(event) {
        if(event.keyCode == 27) {
            hideModal();
        }
    }
}

function hideModal() {
    document.querySelectorAll('.modal').forEach(function(element) {
        element.style.display = 'none';
    });
    document.onkeydown = null;
}

document.querySelectorAll('.modal-content').forEach(function(element) {
    element.onclick = function(event) {
        event.stopPropagation();
    }
})
