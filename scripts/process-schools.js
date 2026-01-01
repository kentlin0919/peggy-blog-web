const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/schools.json');
const outputFile = path.join(__dirname, '../public/schools-clean.json');

try {
  const rawData = fs.readFileSync(inputFile, 'utf8');
  const schools = JSON.parse(rawData);

  // Map to store unique schools by code. 
  // We process from start to end. If the file is sorted by year, later entries might be newer.
  // The raw file seems to have mixed years. We should probably track the latest year if possible.
  // But strictly deduplicating by Code is the main goal.
  const schoolMap = new Map();

  schools.forEach(school => {
    const code = school['代碼'];
    const name = school['學校名稱'];
    const rawCity = school['縣市名稱'];
    const year = parseInt(school['學年度']);

    if (!code || !name) return;

    // Clean city: "[38]臺北市" -> "臺北市"
    const city = rawCity ? rawCity.replace(/^\[\d+\]/, '') : '';

    const existing = schoolMap.get(code);
    
    // If new or newer year (assuming we want latest info, though name/city rarely change)
    if (!existing || year > existing.year) {
      schoolMap.set(code, {
        code,
        name,
        city,
        year // keep strictly for comparison, maybe remove in final output if user didn't ask
      });
    }
  });

  // Convert to array and sort by code
  const result = Array.from(schoolMap.values())
    .sort((a, b) => a.code.localeCompare(b.code))
    .map(({ code, name, city }) => ({ code, name, city }));

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log(`Successfully processed ${schools.length} entries into ${result.length} unique schools.`);
  console.log(`Saved to ${outputFile}`);

} catch (err) {
  console.error('Error processing schools:', err);
}
