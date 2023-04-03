const mysql = require('mysql2/promise');
const XLSX = require('xlsx');

// MySQL database connection configuration
const config = {
  host: '172.32.146.102',
  user: 'bonita',
  password: 'Bonita@123',
  database: 'test',
};

// Excel file path
const excelFilePath = 'C://Users//ITCK//Downloads//Test_Data.xlsx';

// Worksheet name
const sheetName = 'Test';

(async () => {
  try {
    // Connect to MySQL database
    const connection = await mysql.createConnection(config);

    // Read Excel file
    const workbook = XLSX.readFile(excelFilePath);

    // Get worksheet data
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Loop through rows and insert into database
    for (const row of data) {
      const sql = 'INSERT INTO your_table (column1, column2, column3) VALUES (?, ?, ?)';
      const values = [row.column1, row.column2, row.column3];
      await connection.query(sql, values);
    }

    // Close MySQL connection
    await connection.end();

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error(error);
  }
})();
