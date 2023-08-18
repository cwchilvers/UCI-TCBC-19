import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//* Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database <db_name> and version <db_version>
  const db = await openDB('jate', 1);

  // Add the content to the database
  await db.add('jate', content);

  console.log('Content added to the database: ', content);

  // Return the content
  return content;
}

//* Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database <db_name> and version <db_version>
  const db = await openDB('jate', 1);

  // Get all the content from the database
  const content = await db.getAll('jate');

  console.log('Content from the database: ', content);

  // Return the content
  return content;
}

initdb();
