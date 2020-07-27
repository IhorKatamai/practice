(()=>{
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
    {
        id: 4,
        firstName: 'Ihor',
        lastName: 'Shynkarchuk',
        createdDate: '2/2/20',
        position: 'Front-end Developer'
    },
    {
        id: 5,
        firstName: 'Volodia',
        lastName: 'Torkoniak',
        createdDate: '3/3/20',
        position: 'Back-end Developer'
    },
    {
        id: 6,
        firstName: 'Olia',
        lastName: 'Yakubiak',
        createdDate: '9/9/20',
        position: 'Full Stack Developer'
    },
    {
        id: 7,
        firstName: 'Mykhailo',
        lastName: 'Shevchenko',
        createdDate: '10/10/20',
        position: 'HR'
    },
    {
        id: 8,
        firstName: 'Vasyl',
        lastName: 'Soloveiko',
        createdDate: '1/1/20',
        position: 'Back-end Developer'
    },
    {
        id: 9,
        firstName: 'Artem',
        lastName: 'Bilyi',
        createdDate: '5/15/20',
        position: 'Full Stack Developer'
    },
    {
        id: 10,
        firstName: 'Dmytro',
        lastName: 'Honta',
        createdDate: '1/11/20',
        position: 'Back-end Developer'
    },
    {
        id: 11,
        firstName: 'Ivan',
        lastName: 'Sirko',
        createdDate: '5/15/20',
        position: 'Full Stack Developer'
    },
    ];

    const TableData = { 
        keys: [
        { key: 'id', visible: true }, 
        { key: 'firstName', visible: true }, 
        { key: 'lastName', visible: true }, 
        { key: 'createdDate', visible: true }, 
        { key: 'position', visible: true } 
        ], 
        pageSize: 5, 
        currentPage: 1 
    };

    const tableWrap = document.getElementById('table-wrap');
    let TABLE_EL;
    createPagination();
    createTable();
    populateTable();
    document.querySelector('.custom-select').onchange = changePageSize;
    
    document.querySelectorAll('.page-item').forEach(function(element) {
        element.onclick = setPage;
    })

    function setPage() {
        TableData.currentPage = this.dataset.page;
        refreshTable();
    }
    
    function createPagination() {
        tableWrap.insertAdjacentHTML('afterend', '<nav aria-label="..." class="pagination-wrap"><ul class="pagination"></ul></nav>');
        let pagination = document.querySelector('.pagination-wrap');
        let pagesHTML = '';
        const numberOfPages = caclNumberOfPages();
        for (let i = 1; i <= numberOfPages; i++) {
            pagesHTML += `<li class="page-item ${TableData.currentPage == i ? 'disabled': ''}" data-page="${i}"><a class="page-link" href="#">${i}</a></li>`;
        }
        pagination.children[0].innerHTML = pagesHTML;
        document.querySelectorAll('.page-item').forEach(function(element) {
            element.onclick = setPage;
        })
    }
    
    function caclNumberOfPages() {
        return Math.ceil(DATA.length/TableData.pageSize);
    }
    
    function createTable() {
        document.querySelector('#table-wrap').innerHTML='<table id="dataTable" class="table table-bordered mt-3"><thead><tr></tr></thead><tbody></tbody></table>';
        TABLE_EL = document.getElementById('dataTable');
        const tr = TABLE_EL.tHead.children[0];
    
        for (const key of TableData.keys.filter(item => item.visible)) {
            tr.insertCell().outerHTML = `<th>${key.key.toUpperCase()}</th>`;
        }
    }
    
    function populateTable() {
        const dataArr = getPaginatedData();
        const visibleColumns = TableData.keys.filter(item => item.visible);
        for (let i = 0; i < dataArr.length; i++) {
            const newRow = TABLE_EL.getElementsByTagName('tbody')[0].insertRow();
            for (const key of visibleColumns) {
                const newCell = newRow.insertCell();
                const newText = document.createTextNode(dataArr[i][key.key]);
                newCell.appendChild(newText);
            }
        }
    }
    
    function getPaginatedData() {
        return DATA.slice((TableData.currentPage - 1) * TableData.pageSize, TableData.currentPage * TableData.pageSize);
    }
    
    function changePageSize() {
        TableData.pageSize = this.value;
        TableData.currentPage = 1;
        refreshTable();
    }
    
    function refreshTable() {
        TABLE_EL.getElementsByTagName('tbody')[0].innerHTML = '';
        document.querySelector('.pagination-wrap').remove();
        createPagination();
        populateTable();
    }
    
    function addNewUser() {
        const user = {id:'', firstName:'', lastName:'', createdDate:'', position:''};
        user.id = DATA.length + 1;
        user.firstName = document.getElementById("firstName").value;
        user.lastName = document.getElementById("lastName").value;
        const currentDate = new Date();
        user.createdDate = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear().toString().slice(-2)}`;
        user.position = document.getElementById("position").value;
        DATA.push(user);
        refreshTable();
    }
    
    document.querySelectorAll('[data-save="modal"]').forEach(function(element) {
        element.addEventListener('click', (event) => {
            addNewUser();
            hideModal(event.target);
        });
    })

    // Modal
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