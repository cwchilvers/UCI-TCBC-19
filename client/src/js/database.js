import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('editorContent')) {
        db.createObjectStore('editorContent', { keyPath: 'id', autoIncrement: true });
        console.log(`${'editorContent'} store created`);
      }
    },
  });

//* Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database and version we want to use.
  const db = await openDB('jate', 1);

  // Open up the desired object store.
  const store = db.transaction('editorContent', 'readwrite').objectStore('editorContent');

  // Use the .put() method on the store and pass in the content
  await store.put({ content, id: 1 });

  // Get confirmation of the request.
  console.log('Content updated in the database: ', content);
};

//* Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database and version we want to use.
  const db = await openDB('jate', 1);

  // Open up the desired object store.
  const store = db.transaction('editorContent', 'readonly').objectStore('editorContent');

  // Use the .get() method on the store to get the content
  const content = await store.get(1); // Using id: 1 as the key

  // Get confirmation of the request.
  console.log('Content from the database: ', content);
  return content && content.content;
}

initdb();
