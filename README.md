# Chemicals

#Contents
1. Introduction
2. Features
3. Technologies
4. Setup and usage
5. How to use
6. Validation
7. Local storage
8. Source credits

#Introduction
A web application taht provides a user firendly interface for chemical inventory management. It provides features like view data, edit data, add new data, delete data. The data will be stored and accessed using local storage.

#Features
1. Display chemical inventory data in a tabular format
2. Sort data by clicking on column headers
3. Add new chemical entries
4. Edit existing chemical entries
5. Delete chemical entries
6. Move selected rows up or down
7. Save data to local storage
8. Responsive design for various screen sizes

#Technologies
1. HTML
2. CSS
3. Javascript

#Setup and Usage
1. Clone the repository or download the source code.
2. Open index.html in a modern web browser.
3. The application will load with default chemical data if no data is found in local storage.

#How to Use
1. View Data: The chemical inventory is displayed in a table format on page load.
2. Sort Data: Click on any column header to sort the table by that column. Click again to reverse the sort order.
3. Add New Chemical: Click the "➕" button to add a new row. Fill in the details and click "Save" to add the new chemical to the inventory.
4. Edit Chemical: Double-click on any row to edit its contents. Make your changes and click "Save" to update the chemical information.
5. Delete Chemical: Select a row and click the "🗑️" button to delete it from the inventory.
6. Move Rows: Use the "⬆️" and "⬇️" buttons to move the selected row up or down in the table.
7. Save Changes: Click the "🔄💾" button to save all changes to local storage and refresh the page.
8. Mandatory field values are represented with a (*).

#Local Storage
The application uses the browser's local storage to persist data between sessions. The data is saved automatically when adding, editing, or deleting entries, and can be manually saved using the "Save and refresh" button.

#Source-credits
https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
https://medium.com/codex/web-crud-localstorage-using-javascript-10b4802c28a9
https://stackoverflow.com/questions/22897377/making-wide-table-fit-bootstrap-container

