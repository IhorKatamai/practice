(() => {
    const data = [
        {
            id: 1596541016200,
            firstName: 'Petro',
            lastName: 'Boyko',
            createdDate: '10/20/20',
            position: 'HR'
        },
        {
            id: 1596541016202,
            firstName: 'Julia',
            lastName: 'Kornuta',
            createdDate: '1/1/20',
            position: 'Back-end Developer'
        },
        {
            id: 1596541016205,
            firstName: 'Eduard',
            lastName: 'Sobotnyk',
            createdDate: '5/15/20',
            position: 'Full Stack Developer'
        },
        {
            id: 1596541016209,
            firstName: 'Ihor',
            lastName: 'Shynkarchuk',
            createdDate: '2/2/20',
            position: 'Front-end Developer'
        },
        {
            id: 1596541016214,
            firstName: 'Volodia',
            lastName: 'Torkoniak',
            createdDate: '3/3/20',
            position: 'Back-end Developer'
        },
        {
            id: 1596541016220,
            firstName: 'Olia',
            lastName: 'Yakubiak',
            createdDate: '9/9/20',
            position: 'Full Stack Developer'
        },
        {
            id: 1596541016227,
            firstName: 'Mykhailo',
            lastName: 'Shevchenko',
            createdDate: '10/10/20',
            position: 'HR'
        },
        {
            id: 1596541016235,
            firstName: 'Vasyl',
            lastName: 'Soloveiko',
            createdDate: '1/1/20',
            position: 'Back-end Developer'
        },
        {
            id: 1596541016249,
            firstName: 'Artem',
            lastName: 'Bilyi',
            createdDate: '5/15/20',
            position: 'Full Stack Developer'
        },
        {
            id: 1596541016259,
            firstName: 'Dmytro',
            lastName: 'Honta',
            createdDate: '1/11/20',
            position: 'Back-end Developer'
        },
        {
            id: 1596541016270,
            firstName: 'Ivan',
            lastName: 'Sirko',
            createdDate: '5/15/20',
            position: 'Full Stack Developer'
        },
    ];

    const tableData = {
        keys: [
            { key: 'id', visible: true },
            { key: 'firstName', visible: true },
            { key: 'lastName', visible: true },
            { key: 'createdDate', visible: true },
            { key: 'position', visible: true },
            { key: 'operate', visible: true }
        ],
        sort: {
            column: null,
            order: null
        },
        pageSize: 5,
        currentPage: 1,
        getData() {
            let _data;
            const { column, order } = this.sort;
            if (this.sort.order != null) {
                _data = data.slice().sort((firstUser, secondUser) => {
                    if (order === 'asc') {
                        return firstUser[column] > secondUser[column] ? 1 : -1;
                    }
                    return firstUser[column] < secondUser[column] ? 1 : -1;
                });
            } else {
                _data = data.slice();
            }
            return _data.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        }
    };

    const tableWrap = document.getElementById('table-wrap');
    let tableEl;
    createPagination();
    createTable();
    populateTable();
    document.querySelector('.custom-select').onchange = changePageSize;
    document.querySelectorAll('.page-item').forEach(function (element) {
        element.addEventListener('click', setPage);
    });

    function createPagination() {
        tableWrap.insertAdjacentHTML('afterend', '<nav aria-label="..." class="pagination-wrap"><ul class="pagination"></ul></nav>');
        let pagination = document.querySelector('.pagination-wrap');
        let pagesHTML = '';
        const numberOfPages = caclNumberOfPages();
        for (let i = 1; i <= numberOfPages; i++) {
            pagesHTML += `<li class="page-item ${tableData.currentPage == i ? 'disabled' : ''}" data-page="${i}"><a class="page-link" href="#">${i}</a></li>`;
        }
        pagination.children[0].innerHTML = pagesHTML;
        document.querySelectorAll('.page-item').forEach(function (element) {
            element.addEventListener('click', setPage);
        });
    }

    function caclNumberOfPages() {
        return Math.ceil(data.length / tableData.pageSize);
    }

    function setPage() {
        tableData.currentPage = this.dataset.page;
        refreshTable();
    }

    function createTable() {
        document.querySelector('#table-wrap').innerHTML = '<table id="dataTable" class="table table-bordered mt-3"><thead><tr></tr></thead><tbody></tbody></table>';
        tableEl = document.getElementById('dataTable');
        const tr = tableEl.tHead.children[0];
        for (const key of tableData.keys.filter(item => item.visible)) {
            if (key.key === 'operate') {
                tr.insertCell().outerHTML = `<th class="pr-4">${key.key.toUpperCase()}</th>`;
            } else {
                tr.insertCell().outerHTML = `<th class="pr-4">
                ${key.key.toUpperCase()}<button class="sort-btn ${tableData.sort.column == key.key && tableData.sort.order != null ? ' sorted' : ''}" data-column="${key.key}">
                <i class="fas ${getSortIcon(key.key)}"></i></button></th>`;
            }
        }
        document.querySelectorAll('.sort-btn').forEach(function (element) {
            element.addEventListener('click', setSortData);
        });
    }

    function getSortIcon(column) {
        if (column === tableData.sort.column) {
            if (tableData.sort.order === null) {
                return 'fa-arrows-alt-v';
            } else if (tableData.sort.order === 'desc') {
                return 'fa-sort-alpha-up';
            } else if (tableData.sort.order === 'asc') {
                return 'fa-sort-alpha-down';
            }
        }
        return 'fa-arrows-alt-v';
    }

    function setSortData() {
        const { column, order } = tableData.sort;
        if (column === this.dataset.column) {
            if (order === null) {
                tableData.sort.order = 'asc';
            } else if (order === 'asc') {
                tableData.sort.order = 'desc';
            } else if (order === 'desc') {
                tableData.sort.order = null;
            }
        } else {
            tableData.sort.order = 'asc';
        }
        tableData.sort.column = this.dataset.column;
        refreshHeader();
        refreshTable();
    }

    function refreshHeader() {
        document.querySelectorAll('.sort-btn').forEach(function (element) {
            element.classList.remove('sorted');
            if (tableData.sort.column === element.dataset.column && tableData.sort.order != null) {
                element.classList.add('sorted');
            }
            element.innerHTML = `<i class="fas ${getSortIcon(element.dataset.column)}"></i>`;
        });
    }

    function refreshTable() {
        tableEl.getElementsByTagName('tbody')[0].innerHTML = '';
        document.querySelector('.pagination-wrap').remove();
        createPagination();
        populateTable();
    }

    function populateTable() {
        const dataArr = tableData.getData();
        const visibleColumns = tableData.keys.filter(item => item.visible);
        for (let i = 0; i < dataArr.length; i++) {
            const newRow = tableEl.getElementsByTagName('tbody')[0].insertRow();
            for (const key of visibleColumns) {
                const newCell = newRow.insertCell();
                if (key.key === 'operate') {
                    newCell.innerHTML = `<button type="button" class="btn btn-secondary btn-edit-user-modal mr-2" value="${dataArr[i]['id']}">Edit</button><button type="button" class="btn btn-danger btn-delete-user-modal" value="${dataArr[i]['id']}">Delete</button>`;
                } else {
                    const newText = document.createTextNode(dataArr[i][key.key]);
                    newCell.appendChild(newText);
                }
            }
        }
        // Handle edit user btn click
        document.querySelectorAll('.btn-edit-user-modal').forEach(function (element) {
            element.addEventListener('click', (event) => {
                createNewModal('.btn-edit-user-modal', element.value);
            });
        });
        // Handle delete user btn click
        document.querySelectorAll('.btn-delete-user-modal').forEach(function (element) {
            element.addEventListener('click', (event) => {
                createNewModal('.btn-delete-user-modal', element.value);
            });
        });
    }

    function changePageSize() {
        tableData.pageSize = this.value;
        tableData.currentPage = 1;
        refreshTable();
    }

    // Dropdown Filter
    document.querySelector('.dropdown-toggle').addEventListener('click', displayFilter);
    document.getElementById('check-all-btn').addEventListener('click', checkAllFilters);
    document.getElementById('check-none-btn').addEventListener('click', checkNoneFilters);
    document.getElementById('start-filter-btn').addEventListener('click', filterColumns);
    document.querySelector('.dropdown-filter').addEventListener('click', (event) => {
        event.stopPropagation();
    });
    document.addEventListener('click', () => {
        const container = document.querySelector('.dropdown-filter');
        if (container.classList.contains('show')) {
            container.classList.remove('show');
        }
    });

    function displayFilter(event) {
        event.stopPropagation();
        populateFilters();
        document.querySelector('.dropdown-filter').classList.toggle('show');
    }

    function checkAllFilters() {
        document.querySelectorAll('.filter-check').forEach(function (element) {
            element.checked = true;
        });
    }

    function checkNoneFilters() {
        document.querySelectorAll('.filter-check').forEach(function (element) {
            element.checked = false;
        });
    }

    function filterColumns() {
        document.querySelectorAll('.filter-check').forEach(function (element) {
            const column = tableData.keys.find(el => el.key == element.value);
            column.visible = element.checked;
        });
        hideFilter();
        recreateTable();
    }

    function hideFilter() {
        document.querySelector('.dropdown-filter').classList.remove('show');
    }

    function populateFilters() {
        tableData.keys.forEach(function (element) {
            document.querySelector(`input[value="${element.key}"]`).checked = element.visible;
        });
    }

    function recreateTable() {
        deleteTable();
        createTable();
        populateTable();
    }

    function deleteTable() {
        tableEl.remove();
    }
    
    // Handle add user btn click
    document.querySelector('.btn-show-add-user-modal').addEventListener('click', (event) => {
        createNewModal('.btn-show-add-user-modal');
    });

    const modalAddUser = 
    `<div class="modal custom-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Add New User</h5>
                    <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">First Name</span>
                        </div>
                        <input id="firstName" type="text" class="form-control" aria-label="Default"aria-describedby="inputGroup-sizing-default" maxlength="30">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Last Name</span>
                        </div>
                        <input id="lastName" type="text" class="form-control" aria-label="Default"aria-describedby="inputGroup-sizing-default" maxlength="30">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Position</span>
                        </div>
                        <input id="position" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" maxlength="30">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-close">Close</button>
                    <button type="button" class="btn btn-success btn-add-user">Save changes</button>
                </div>
            </div>
        </div>
    </div>`;

    const modalEditUser = 
    `<div class="modal custom-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Edit User</h5>
                    <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">First Name</span>
                        </div>
                        <input id="firstName" type="text" class="form-control" aria-label="Default"aria-describedby="inputGroup-sizing-default" maxlength="30">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Last Name</span>
                        </div>
                        <input id="lastName" type="text" class="form-control" aria-label="Default"aria-describedby="inputGroup-sizing-default" maxlength="30">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Position</span>
                        </div>
                        <input id="position" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" maxlength="30">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-close">Close</button>
                    <button type="button" class="btn btn-success btn-edit-user">Save changes</button>
                </div>
            </div>
        </div>
    </div>`;

    const modalDeleteUser = 
    `<div class="modal custom-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content"><div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Delete User</h5>
                <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this user?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-close">Close</button>
                <button type="button" class="btn btn-danger btn-delete-user">Delete</button>
            </div>
        </div>
    </div>`;

    function createNewModal(btn, id) {
        switch(btn) {
            case '.btn-show-add-user-modal': {
                document.querySelector('body').insertAdjacentHTML('afterBegin', modalAddUser);
                document.querySelector('.btn-add-user').addEventListener('click', (event) => {
                    if (addNewUser()) {
                        removeModal();
                    }
                });
                break;
            }
            case '.btn-edit-user-modal': {
                document.querySelector('body').insertAdjacentHTML('afterBegin', modalEditUser);
                fillFields(id);
                document.querySelector('.btn-edit-user').addEventListener('click', (event) => {
                    if (editUser(id)) {
                        removeModal();
                    }
                });
                break;
            }
            case '.btn-delete-user-modal': {
                document.querySelector('body').insertAdjacentHTML('afterBegin', modalDeleteUser);
                document.querySelector('.btn-delete-user').addEventListener('click', (event) => {
                    deleteUser(id);
                    removeModal();
                });
                break;
            }
        }
        // Close modal actions
        document.onkeydown = function (event) {
            if (event.keyCode === 27) {
                removeModal();
            }
        };
        document.querySelectorAll('.btn-close').forEach(function (element) {
            element.addEventListener('click', removeModal);
        });
        document.querySelectorAll('.modal').forEach(function (element) {
            element.addEventListener('click', removeModal);
        });
        // Prevent close on click on modal
        document.querySelectorAll('.modal-content').forEach(function (element) {
            element.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    }

    function removeModal() {
        document.querySelector('.modal').remove();
        document.onkeydown = null;
    }

    // Fill fields before editing
    function fillFields(indicator) {
        const { firstName, lastName, position }  = data.find(el => el.id == indicator);
        document.getElementById("firstName").value = firstName;
        document.getElementById("lastName").value = lastName;
        document.getElementById("position").value = position;
    }

    function editUser(indicator) {
        if (validateFields()) {
            const user  = data.find(el => el.id == indicator);
            user.firstName = document.getElementById("firstName").value;
            user.lastName = document.getElementById("lastName").value;
            user.position = document.getElementById("position").value;
            tableData.getData();
            alert('User was successfully edited.', 'alert-success');
            refreshTable();
            return true;
        }
        alert('Please, fill out all fields.', 'alert-danger');
        return false;
    }

    function deleteUser(indicator) {
        const index = data.indexOf(data.find(el => el.id == indicator));
        data.splice(index, 1);
        tableData.getData();
        alert('User was successfully deleted.', 'alert-success');
        refreshTable();
    }

    function addNewUser() {
        if (validateFields()) {
            const user = { id: '', firstName: '', lastName: '', createdDate: '', position: '' };
            user.id = Date.now();
            user.firstName = document.getElementById("firstName").value;
            user.lastName = document.getElementById("lastName").value;
            const currentDate = new Date();
            user.createdDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear().toString().slice(-2)}`;
            user.position = document.getElementById("position").value;
            data.push(user);
            tableData.getData();
            alert('User was successfully added.', 'alert-success');
            refreshTable();
            return true;
        }
        alert('Please, fill out all fields.', 'alert-danger');
        return false;
    }

    function validateFields() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const position = document.getElementById("position").value;
        return !(firstName === '' || lastName === '' || position === '');
    }
    
    function alert(message, context, timeremove = 3000) {
        let alert = document.createElement('div');
        alert.classList.add('alert');
        alert.classList.add(context);
        alert.classList.add('custom-alert');
        alert.innerHTML = message;
        document.querySelector('body').appendChild(alert);
        setTimeout(function () { deleteAlert(alert) }, timeremove);
    }

    function deleteAlert(alert) {
        alert.remove();
    }
})();