// Default chemical data
const defaultChemicalData = [
    { id: 1, name: "Acetone", vendor: "Chemcorp", density: 0.79, viscosity: 0.432, packaging: "Bottle", packSize: 1, unit: "L", quantity: 100 },
    { id: 2, name: "Pentane", vendor: "LG Chem", density: 234.54, viscosity: 324.78, packaging: "Bag", packSize: 5, unit: "Kg", quantity: 45 },
    { id: 3, name: "Sulfuric Acid", vendor: "Formosa", density: 1.84, viscosity: 0.89, packaging: "Drum", packSize: 6, unit: "t", quantity: 750 },
    { id: 4, name: "Benzene", vendor: "Acid Solutions", density: 0.876, viscosity: 0.65, packaging: "Bottle", packSize: 5, unit: "L", quantity: 780 },
    { id: 5, name: "Ethanol", vendor: "PureChem", density: 0.789, viscosity: 1.2, packaging: "Bottle", packSize: 1, unit: "L", quantity: 200 },
    { id: 6, name: "Methanol", vendor: "ChemWorks", density: 0.791, viscosity: 0.6, packaging: "Drum", packSize: 50, unit: "L", quantity: 150 },
    { id: 7, name: "Toluene", vendor: "ChemSource", density: 0.866, viscosity: 0.59, packaging: "Can", packSize: 2, unit: "L", quantity: 120 },
    { id: 8, name: "Chloroform", vendor: "Reagents Inc.", density: 1.48, viscosity: 0.56, packaging: "Bottle", packSize: 1, unit: "L", quantity: 300 },
    { id: 9, name: "Hydrochloric Acid", vendor: "Acids Co.", density: 1.18, viscosity: 0.89, packaging: "Drum", packSize: 10, unit: "L", quantity: 400 },
    { id: 10, name: "Acetic Acid", vendor: "FoodChem", density: 1.05, viscosity: 1.07, packaging: "Bottle", packSize: 1, unit: "L", quantity: 250 },
    { id: 11, name: "Sodium Hydroxide", vendor: "ChemSupply", density: 2.13, viscosity: 0.7, packaging: "Bag", packSize: 25, unit: "Kg", quantity: 200 },
    { id: 12, name: "Ammonia", vendor: "AquaChem", density: 0.73, viscosity: 0.49, packaging: "Cylinder", packSize: 10, unit: "L", quantity: 80 },
    { id: 13, name: "Sodium Chloride", vendor: "SaltWorks", density: 2.16, viscosity: 0.0, packaging: "Bag", packSize: 5, unit: "Kg", quantity: 500 },
    { id: 14, name: "Calcium Carbonate", vendor: "Minerals Inc.", density: 2.71, viscosity: 0.0, packaging: "Bag", packSize: 25, unit: "Kg", quantity: 300 },
    { id: 15, name: "Potassium Chloride", vendor: "ChemMart", density: 1.98, viscosity: 0.0, packaging: "Bag", packSize: 1, unit: "Kg", quantity: 150 }
];

let chemicalData = JSON.parse(localStorage.getItem('chemicalData')) || defaultChemicalData;

//DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    if (chemicalData.length === 0) {
        chemicalData = defaultChemicalData;
    }
    populateChemicalTable(chemicalData);
    attachRowClickEvents();
    attachSortListeners();
});


// declaring variables
let currentSortColumn = null;
let currentSortOrder = 'asc'; 
let selectedRow = null;
const visibleRowCount = 7;
let selectedRowIndex = 0;
const tableBody = document.querySelector("#chemicalTable tbody");
const tableContainer = document.querySelector(".table-responsive"); 


// Make sure to call populateChemicalTable on page load
document.addEventListener('DOMContentLoaded', function() {
    populateChemicalTable(chemicalData);
    attachRowClickEvents();
    attachSortListeners();
});

//function to attach sort listeners to table headers
function attachSortListeners() {
    const headers = document.querySelectorAll('#chemicalTable th');
    headers.forEach((header, index) => {
        if (index > 0) { // Skip the first column (tick column)
            header.addEventListener('click', function(event) {
                sortTable(event);
            });
        }
    });
}

//Add values to table
function populateChemicalTable(chemicalData) {
    chemicalData.sort((a, b) => a.id - b.id);

    tableBody.innerHTML = "";
    chemicalData.forEach((chemical) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="tick-column"><span class="tick">&#10003;</span></td>
            <td>${chemical.id}</td>
            <td>${chemical.name}</td>
            <td>${chemical.vendor}</td>
            <td>${chemical.density}</td>
            <td>${chemical.viscosity}</td>
            <td>${chemical.packaging}</td>
            <td>${chemical.packSize}</td>
            <td>${chemical.unit}</td>
            <td>${chemical.quantity}</td>
        `;

        //Double-click event listener for editing
        row.addEventListener('dblclick', function() {
            makeRowEditable(this, chemical.id);
        });
        tableBody.appendChild(row);
    });
    attachRowClickEvents();
    updateVisibleRows();
}

  populateChemicalTable(chemicalData); 


//To show a specific number of rows
function updateVisibleRows() {
    const rows = Array.from(tableBody.children);
    const startIndex = Math.max(0, Math.min(selectedRowIndex, rows.length - visibleRowCount));
    const endIndex = Math.min(startIndex + visibleRowCount, rows.length);
    rows.forEach((row, index) => {
        if (index >= startIndex && index < endIndex) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    highlightSelectedRow();
}

function sortTable(event) {
    const columnIndex = event.target.cellIndex;
    const table = document.getElementById("chemicalTable");
    let rows = Array.from(table.querySelectorAll("tbody tr"));
    let isNumeric = [1, 4, 5, 7, 9].includes(columnIndex); 
    if (currentSortColumn === columnIndex) {
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = columnIndex;
        currentSortOrder = 'asc';
    }
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent.trim();
        const cellB = b.cells[columnIndex].textContent.trim();

        if (isNumeric) {
            const valA = cellA === "N/A" ? -Infinity : parseFloat(cellA) || 0;
            const valB = cellB === "N/A" ? -Infinity : parseFloat(cellB) || 0;
            return currentSortOrder === 'asc' ? valA - valB : valB - valA;
        } else {
            return currentSortOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });
    rows.forEach(row => row.remove());
    rows.forEach(row => table.querySelector("tbody").appendChild(row));
    updateVisibleRows();
    if (selectedRowIndex !== -1) {
        const selectedId = chemicalData[selectedRowIndex].id;
        const newSelectedRow = rows.find(row => parseInt(row.cells[1].textContent) === selectedId);
        if (newSelectedRow) {
            selectedRowIndex = rows.indexOf(newSelectedRow);
            highlightSelectedRow();
        }
    }
}

//function to highlight the selected row
function highlightSelectedRow() {
    const rows = document.querySelectorAll('#chemicalTable tbody tr');
    rows.forEach((row, index) => {
        if (index === selectedRowIndex) {
            row.classList.add('selected');
        } else {
            row.classList.remove('selected');
        }
    });
}

//To select a row by click
function attachRowClickEvents() {
    const rows = document.querySelectorAll('#chemicalTable tbody tr');
    rows.forEach((row, index) => {
        row.addEventListener('click', function () {
            selectedRowIndex = index;
            highlightSelectedRow();
            updateVisibleRows();
        });
    });
}

//function to save the updated chemicalData to localStorage
function saveChemicalDataToLocalStorage() {
    localStorage.setItem('chemicalData', JSON.stringify(chemicalData));
}


populateChemicalTable(chemicalData);

// Event listeners for each button
document.getElementById('moveUp').addEventListener('click', function () {
moveUp();
});
document.getElementById('moveDown').addEventListener('click', function () {
moveDown();
});
document.getElementById('deleteRow').addEventListener('click', function () {
deleterow();
});
document.getElementById('saveData').addEventListener('click', function() {
saveAndRefresh();
});
document.getElementById('addRow').addEventListener('click', function() {
addNewChemical();
});

//Move row up functionality
function moveUp() {
    if (selectedRowIndex > 0) {
        selectedRowIndex--;
        updateVisibleRows();
    }
}

//Move row up functionality
function moveDown() {
    const rows = document.querySelectorAll('#chemicalTable tbody tr');
    if (selectedRowIndex < rows.length - 1) {
        selectedRowIndex++;
        updateVisibleRows();
    }
}

//Delete a row permanently from json array
function deleterow() {  
    if (selectedRowIndex !== -1) {  
    const confirmDelete = confirm("The row will be deleted permanently from localStorage. Do you want to delete it?");  
        if (confirmDelete) {   
        const selectedId = parseInt(document.querySelectorAll('#chemicalTable tbody tr')[selectedRowIndex].cells[1].innerText);   
        const indexToDelete = chemicalData.findIndex(chemical => chemical.id === selectedId);  
            if (indexToDelete !== -1) {   
                chemicalData.splice(indexToDelete, 1);   
                saveChemicalDataToLocalStorage();  
            }  
        document.querySelectorAll('#chemicalTable tbody tr')[selectedRowIndex].remove();  
        selectedRowIndex = -1;  
        }  
    }
    else {  
        alert("Please select a row to delete.");  
    }  
}
   
//Add a new row to the table
function addNewChemical() {
    const nextId = getNextAvailableId();
    const table = document.getElementById("chemicalTable").getElementsByTagName('tbody')[0];
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td class="tick-column"><span class="tick">&#10004;</span></td>
        <td><input type="number" value="${nextId}" id="newId" disabled></td> <!-- Auto-incremented, disabled for editing -->
        <td><input type="text" id="newName" placeholder="Chemical Name" required></td>
        <td><input type="text" id="newVendor" placeholder="Vendor" required></td>
        <td><input type="number" step="0.01" id="newDensity" placeholder="Density (g/m³)"></td>
        <td><input type="number" step="0.01" id="newViscosity" placeholder="Viscosity (m²/s)"></td>
        <td><input type="text" id="newPackaging" placeholder="Packaging"></td>
        <td><input type="number" step="0.01" id="newPackSize" placeholder="Pack Size" required></td>
        <td><input type="text" id="newUnit" placeholder="Unit" required></td>
        <td><input type="number" id="newQuantity" placeholder="Quantity" required></td>
        <td><button id="saveButton" disabled onclick="saveNewChemical()">Save</button></td>
        <td><span id="errorMessages" style="color: red;"></span></td>
    `;
    table.appendChild(newRow);

    const fields = {
        name: document.getElementById('newName'),
        vendor: document.getElementById('newVendor'),
        density: document.getElementById('newDensity'),
        viscosity: document.getElementById('newViscosity'),
        packaging: document.getElementById('newPackaging'),
        packSize: document.getElementById('newPackSize'),
        unit: document.getElementById('newUnit'),
        quantity: document.getElementById('newQuantity')
    };

    const errorMessagesElement = document.getElementById('errorMessages');
    const saveButton = document.getElementById('saveButton');

    Object.values(fields).forEach(field => {
        field.addEventListener('input', () => validateChemicalForm(fields, errorMessagesElement, saveButton));
    });

    validateChemicalForm(fields, errorMessagesElement, saveButton);
    attachKeyboardNavigation();
}

// Function to validate form fields
function validateChemicalForm(fields, errorMessagesElement, saveButton) {
    let valid = true;
    let errors = [];

    if (!fields.name.value || !/^[A-Za-z\s]+$/.test(fields.name.value)) {
        valid = false;
        errors.push("Chemical name is required and must contain only letters.");
    }
    if (!fields.vendor.value || !/^[A-Za-z\s]+$/.test(fields.vendor.value)) {
        valid = false;
        errors.push("Vendor is required and must contain only letters.");
    }
    if (fields.density.value && isNaN(fields.density.value)) {
        valid = false;
        errors.push("Density must be a valid decimal number.");
    }
    if (fields.viscosity.value && isNaN(fields.viscosity.value)) {
        valid = false;
        errors.push("Viscosity must be a valid decimal number.");
    }
    if (fields.packaging.value && !/^[A-Za-z\s]+$/.test(fields.packaging.value)) {
        valid = false;
        errors.push("Packaging must contain only letters.");
    }
    if (!fields.packSize.value || isNaN(fields.packSize.value)) {
        valid = false;
        errors.push("Pack Size is required and must be a valid decimal number.");
    }
    if (!fields.unit.value || !/^[A-Za-z\s]+$/.test(fields.unit.value)) {
        valid = false;
        errors.push("Unit is required and must contain only letters.");
    }
    if (!fields.quantity.value || isNaN(fields.quantity.value) || !Number.isInteger(parseFloat(fields.quantity.value))) {
        valid = false;
        errors.push("Quantity is required and must be an integer.");
    }
    errorMessagesElement.innerText = errors.join(' ');
    if (saveButton) saveButton.disabled = !valid;

    return valid;
}

//save newly added row
function saveNewChemical() {
    const id = parseInt(document.getElementById("newId").value);
    const fields = {
        name: document.getElementById('newName'),
        vendor: document.getElementById('newVendor'),
        density: document.getElementById('newDensity'),
        viscosity: document.getElementById('newViscosity'),
        packaging: document.getElementById('newPackaging'),
        packSize: document.getElementById('newPackSize'),
        unit: document.getElementById('newUnit'),
        quantity: document.getElementById('newQuantity')
    };
    const errorMessagesElement = document.getElementById('errorMessages');
    const saveButton = document.getElementById('saveButton');
    if (!validateChemicalForm(fields, errorMessagesElement, saveButton)) {
        return; 
    }
    const name = fields.name.value;
    const vendor = fields.vendor.value;
    const density = fields.density.value || null;
    const viscosity = fields.viscosity.value || null;
    const packaging = fields.packaging.value || "N/A";
    const packSize = fields.packSize.value || null;
    const unit = fields.unit.value;
    const quantity = fields.quantity.value;

    const newChemical = {
        id: id,
        name: name,
        vendor: vendor,
        density: density ? parseFloat(density) : null,
        viscosity: viscosity ? parseFloat(viscosity) : null,
        packaging: packaging,
        packSize: packSize ? parseFloat(packSize) : null,
        unit: unit,
        quantity: parseInt(quantity)
    };
    chemicalData.push(newChemical);
    populateChemicalTable(chemicalData);
    saveChemicalDataToLocalStorage();
    attachSortListeners(); 
}

//Keyboard navigation
function attachKeyboardNavigation() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                const prevInput = inputs[index - 1];
                if (prevInput) {
                    prevInput.focus();
                }
            }
        });
    });
}

// Find the next available ID for a new chemical
function getNextAvailableId() {
    const usedIds = chemicalData.map(chemical => chemical.id);
    for (let i = 1; ; i++) {
        if (!usedIds.includes(i)) return i; 
    }
}


//Edit a row
function makeRowEditable(row, chemicalId) {  
    const chemical = chemicalData.find(c => c.id === chemicalId);  
    if (!chemical) return;  
    row.innerHTML = `
        <td class="tick-column"><span class="tick">&#10004;</span></td>
        <td>${chemical.id}</td>
        <td><input type="text" value="${chemical.name}" id="editName" class="edit-input"></td>
        <td><input type="text" value="${chemical.vendor}" id="editVendor" class="edit-input"></td>
        <td><input type="number" step="0.01" value="${chemical.density}" id="editDensity" class="edit-input"></td>
        <td><input type="number" step="0.01" value="${chemical.viscosity}" id="editViscosity" class="edit-input"></td>
        <td><input type="text" value="${chemical.packaging}" id="editPackaging" class="edit-input"></td>
        <td><input type="number" step="0.01" value="${chemical.packSize}" id="editPackSize" class="edit-input"></td>
        <td><input type="text" value="${chemical.unit}" id="editUnit" class="edit-input"></td>
        <td><input type="number" value="${chemical.quantity}" id="editQuantity" class="edit-input"></td>
        <td><button onclick="saveEditedRow(${chemicalId}, this)" class="btn btn-success" id="saveButton">Save</button></td>
        <td><span id="errorMessages" style="color: red;"></span></td>
    `;
    const fields = {
        name: row.querySelector('#editName'),
        vendor: row.querySelector('#editVendor'),
        density: row.querySelector('#editDensity'),
        viscosity: row.querySelector('#editViscosity'),
        packaging: row.querySelector('#editPackaging'),
        packSize: row.querySelector('#editPackSize'),
        unit: row.querySelector('#editUnit'),
        quantity: row.querySelector('#editQuantity')
    };
    Object.values(fields).forEach((field, index) => {
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextField = Object.values(fields)[index + 1];
                if (nextField) {
                    nextField.focus();  
                } 
                else {
                    row.querySelector('#saveButton').focus();
                }
            } 
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevField = Object.values(fields)[index - 1];
                if (prevField) {
                    prevField.focus();  
                }
            }
        });
    });
    validateChemicalForm(fields, row.querySelector('#errorMessages'), row.querySelector('#saveButton'));
}


// Save the edited row data
function saveEditedRow(chemicalId, saveButtonElement) {
    const row = saveButtonElement.closest('tr');
    const fields = {
        name: row.querySelector('#editName'),
        vendor: row.querySelector('#editVendor'),
        density: row.querySelector('#editDensity'),
        viscosity: row.querySelector('#editViscosity'),
        packaging: row.querySelector('#editPackaging'),
        packSize: row.querySelector('#editPackSize'),
        unit: row.querySelector('#editUnit'),
        quantity: row.querySelector('#editQuantity')
    };
    const errorMessagesElement = row.querySelector('#errorMessages');
    const saveButton = saveButtonElement;
    if (!validateChemicalForm(fields, errorMessagesElement, saveButton)) {
        return; 
    }
    const name = fields.name.value;
    const vendor = fields.vendor.value;
    const density = fields.density.value || null;
    const viscosity = fields.viscosity.value || null;
    const packaging = fields.packaging.value || "N/A";
    const packSize = fields.packSize.value || null;
    const unit = fields.unit.value;
    const quantity = fields.quantity.value;

    const chemicalIndex = chemicalData.findIndex(c => c.id === chemicalId);
    if (chemicalIndex === -1) return;

    chemicalData[chemicalIndex] = {
        id: chemicalId,
        name: name,
        vendor: vendor,
        density: density ? parseFloat(density) : null,
        viscosity: viscosity ? parseFloat(viscosity) : null,
        packaging: packaging,
        packSize: packSize ? parseFloat(packSize) : null,
        unit: unit,
        quantity: parseInt(quantity)
    };
    saveChemicalDataToLocalStorage();
    populateChemicalTable(chemicalData);
    attachSortListeners(); 
}

//save data in storage and Refresh page 
function saveAndRefresh() {
    saveChemicalDataToLocalStorage();
    location.reload();
}
