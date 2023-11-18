const { writeFile, readFile } = require('node:fs/promises');
const path = require('path');

const writeDB = async (filename, data) => {
  const db = JSON.stringify(data);
  const filePath = path.join(__dirname, '../db', filename);
  const file = await writeFile(filePath, db);
};

const readDB = async (filename) => {
  const filePath = path.join(__dirname, '../db', filename);
  console.log(filePath);
  const db = await readFile(filePath, { encoding: 'utf-8' });
  const data = await JSON.parse(db);
  return data;
};

module.exports = {
  writeDB,
  readDB,
};
