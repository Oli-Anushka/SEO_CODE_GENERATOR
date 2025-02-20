const XLSX = require('xlsx');  // Import xlsx module
const filePath = "seo_data.xlsx";  // Path to your Excel file

// Load the Excel file
const file = XLSX.readFile(filePath);

// Get the first sheet name
const sheetName = file.SheetNames[0];
const sheet = file.Sheets[sheetName];

// Convert sheet data to JSON format
const data = XLSX.utils.sheet_to_json(sheet);

const categoryField = Object.keys(data[0])[0];
let blocks = [];
let currentBlock="null";

data.forEach(row => {
    if (row[categoryField ]) { 
        // Start a new block when a new Field value appears
        if (currentBlock) {
            blocks.push(currentBlock); 
        }
        // New block for each field
        currentBlock = {category: row[categoryField ], seoMetatag: {} };

        // New arrays for each field
        Object.keys(row).forEach(key => {
            if (key !== categoryField ) currentBlock.seoMetatag[key] = [];
        });
    }

    // Add row data to respective field arrays
    if (currentBlock) {
        Object.keys(row).forEach(key => {
            if (key !== categoryField ) currentBlock.seoMetatag[key].push(row[key]);
        });
    }
});


if (currentBlock) {
    blocks.push(currentBlock);
}
// prints
console.log(JSON.stringify(blocks, null, 2));