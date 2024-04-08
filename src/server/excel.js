import * as XLSX from 'xlsx';

export const exportToExcel = (employees) => {
    // Create data array to represent Excel file
    const data = employees.map(employee => ({
        'First Name': employee.firstName,
        'Last Name': employee.lastName,
        'Employee ID': employee.employeeId,
        'Date of Starting Work': employee.dateOfStartingWork,
    }));

    // Create new workbook
    const workbook = XLSX.utils.book_new();
    // Create new worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Add worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    // Create Excel file in XLSX format
    XLSX.writeFile(workbook, 'employees.xlsx');
};