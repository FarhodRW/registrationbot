import XLSX from 'xlsx'

 export async function export2excel(data) {
    
  /* fetch JSON data and parse */
  

  /* filter for the Presidents */


  /* flatten objects */

  const rows = data.map(row => ({
   fullname: row.fullname,
    number: row.number,
    course: row.course,
    days: row.days,
    times: row.times,
    createdAt: row.createdAt
  }));

  /* generate worksheet and workbook */
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheet, [["Ism va Familya", "Telefon nomer", "Kurslar", "Kunlar", "Vaqtlar", "Ro'yxatdan o'tgan" ]], { origin: "A1" });

  /* calculate column width */
  const max_width = rows.reduce((w, r) => Math.max(w, r.fullname.length), 10);
  worksheet["!cols"] = [ { wch: max_width } ];

  const date = new Date()
  const folder = `public/${date}.xlsx`
  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbook, folder);
  console.log(folder);
  
  return folder
}
;
