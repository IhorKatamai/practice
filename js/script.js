(()=>{
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
            if (this.sort.order != null) {
                _data = data.slice().sort(sortByColumnAndOrder(this.sort.column, this.sort.order));
            }
            else {
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
    
    document.querySelectorAll('.page-item').forEach(function(element) {
        element.addEventListener('click', setPage);
    })

    function sortByColumnAndOrder(column, order) {
        if (order == 'asc') {
            return (a, b) => a[column] > b[column] ? 1 : -1;
        }
        return (a, b) => a[column] < b[column] ? 1 : -1;
    }

    function setPage() {
        tableData.currentPage = this.dataset.page;
        refreshTable();
    }
    
    function createPagination() {
        tableWrap.insertAdjacentHTML('afterend', '<nav aria-label="..." class="pagination-wrap"><ul class="pagination"></ul></nav>');
        let pagination = document.querySelector('.pagination-wrap');
        let pagesHTML = '';
        const numberOfPages = caclNumberOfPages();
        for (let i = 1; i <= numberOfPages; i++) {
            pagesHTML += `<li class="page-item ${tableData.currentPage == i ? 'disabled': ''}" data-page="${i}"><a class="page-link" href="#">${i}</a></li>`;
        }
        pagination.children[0].innerHTML = pagesHTML;
        document.querySelectorAll('.page-item').forEach(function(element) {
            element.addEventListener('click', setPage);
        })
    }
    
    function caclNumberOfPages() {
        return Math.ceil(data.length/tableData.pageSize);
    }
    
    function createTable() {
        document.querySelector('#table-wrap').innerHTML='<table id="dataTable" class="table table-bordered mt-3"><thead><tr></tr></thead><tbody></tbody></table>';
        tableEl = document.getElementById('dataTable');
        const tr = tableEl.tHead.children[0];
        for (const key of tableData.keys.filter(item => item.visible)) {
            if (key.key == 'operate') {
                tr.insertCell().outerHTML = `<th class="pr-4">${key.key.toUpperCase()}</th>`;
            }
            else {
                tr.insertCell().outerHTML = `<th class="pr-4">
                ${key.key.toUpperCase()}<button class="sort-btn ${tableData.sort.column == key.key && tableData.sort.order != null ? ' sorted': ''}" data-column="${key.key}">
                <i class="fas ${getSortIcon(key.key)}"></i></button></th>`;
            }
        }
        document.querySelectorAll('.sort-btn').forEach(function(element) {
            element.addEventListener('click', setSortData);
        });
    }

    function refreshHeader() {
        document.querySelectorAll('.sort-btn').forEach(function(element) {
            element.classList.remove('sorted');
            if (tableData.sort.column == element.dataset.column && tableData.sort.order != null) {
                element.classList.add('sorted');
            }
            element.innerHTML = `<i class="fas ${getSortIcon(element.dataset.column)}"></i>`;
        });
    }

    function getSortIcon(column) {
        if (column == tableData.sort.column) {
            if (tableData.sort.order == null) {
                return 'fa-arrows-alt-v';
            } else
            if (tableData.sort.order == 'desc') {
                return 'fa-sort-alpha-up';
            } else
            if (tableData.sort.order == 'asc') {
                return 'fa-sort-alpha-down';
            }
        }
        return 'fa-arrows-alt-v';
    }

    function setSortData() {
        if (tableData.sort.column == this.dataset.column) {
            if (tableData.sort.order == null) {
                tableData.sort.order = 'asc';
            } else
            if (tableData.sort.order == 'asc') {
                tableData.sort.order = 'desc';
            } else
            if (tableData.sort.order == 'desc') {
                tableData.sort.order = null;
            }
        } 
        else {
            tableData.sort.order = 'asc';
        }
        tableData.sort.column = this.dataset.column;
        refreshHeader();
        refreshTable();
    }
    
    function populateTable() {
        const dataArr = tableData.getData();
        const visibleColumns = tableData.keys.filter(item => item.visible);
        for (let i = 0; i < dataArr.length; i++) {
            const newRow = tableEl.getElementsByTagName('tbody')[0].insertRow();
            for (const key of visibleColumns) {
                const newCell = newRow.insertCell();
                if (key.key == 'operate') {
                    newCell.innerHTML = `<button type="button" class="btn btn-secondary mr-2" value="${dataArr[i]['id']}">Edit</button><button type="button" class="btn btn-danger" value="${dataArr[i]['id']}">Delete</button>`;
                } 
                else {
                    const newText = document.createTextNode(dataArr[i][key.key]);
                    newCell.appendChild(newText);
                }
            }
        }
    }
    
    function changePageSize() {
        tableData.pageSize = this.value;
        tableData.currentPage = 1;
        refreshTable();
    }
    
    function refreshTable() {
        tableEl.getElementsByTagName('tbody')[0].innerHTML = '';
        document.querySelector('.pagination-wrap').remove();
        createPagination();
        populateTable();
    }
    
    function addNewUser() {
        const user = {id:'', firstName:'', lastName:'', createdDate:'', position:''};
        user.id = Date.now();
        user.firstName = document.getElementById("firstName").value;
        user.lastName = document.getElementById("lastName").value;
        const currentDate = new Date();
        user.createdDate = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear().toString().slice(-2)}`;
        user.position = document.getElementById("position").value;
        data.push(user);
        tableData.getData();
        alert('User was successfully added.', 'alert-success');
        refreshTable();
    }

    // Alert
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
        document.querySelectorAll('.filter-check').forEach(function(element) {
            element.checked = true;
        });
    }

    function checkNoneFilters() {
        document.querySelectorAll('.filter-check').forEach(function(element) {
            element.checked = false;
        });
    }

    function filterColumns() {
        document.querySelectorAll('.filter-check').forEach(function(element) {
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
        tableData.keys.forEach(function(element) {
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

    // Modal
    document.querySelectorAll('[data-save="modal"]').forEach(function(element) {
        element.addEventListener('click', (event) => {
            addNewUser();
            hideModal(event.target);
        });
    })

    document.querySelectorAll('[data-toggle="modal"]').forEach(function(element) {
        element.addEventListener('click', showModal);
    })

    document.querySelectorAll('[data-dismiss="modal"]').forEach(function(element) {
        element.addEventListener('click', (event) => hideModal(event.target));
    })

    document.querySelectorAll('.modal').forEach(function(element) {
        element.addEventListener('click', (event) => hideModal(event.target));
    })

    function showModal() {
        document.querySelector(this.dataset.target).style.display = 'block';
        document.onkeydown = function(event) {
            if(event.keyCode == 27) {
                hideModal(document.querySelector('.modal'));
            }
        }
    }

    function hideModal(element) {
        element.closest('.modal').style.display = 'none';
        document.onkeydown = null;
    }

    document.querySelectorAll('.modal-content').forEach(function(element) {
        element.onclick = function(event) {
            event.stopPropagation();
        }
    })
})();