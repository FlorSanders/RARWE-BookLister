import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Author from 'rarwe/models/author';
import Book from 'rarwe/models/book';

module('Unit | Service | library', function(hooks) {
  setupTest(hooks);

  test('The libary can store and retrieve authors', async function(assert) {
    // Obtain the library service from the test environment
    let library = this.owner.lookup('service:library');
    // Add some author
    let author1 = 'Cal Newport';
    library.add('author', new Author({id: 1, name: author1}));
    // Perform some rudimentary tests
    assert.equal(library.authors.length, 1);
    assert.equal(library.authors[0].name, author1);
  });

  test('The library can store and retrieve books', async function(assert){
    // Obtain the library service from the test environment
    let library = this.owner.lookup('service:library');
    // Add a book
    let book1 = 'The subtle art of not giving a fuck';
    library.add('books', new Book({id: 1, title: book1, rating: 4}));
    // Perform some rudimentary tests
    assert.equal(library.books.length, 1);
    assert.equal(library.books[0].title, book1);
  });

  test('Load a record from a JSON:API response', async function(assert) {
    // Obtain the library service from the test environment
    let library = this.owner.lookup('service:library');
    // Test libary loading functionality
    library.load({
      data: {
        type: 'bands',
        id: 1,
        attributes: {
          name: 'TOOL',
        },
        relationships: {
          songs: {
            links: {
              related: '/bands/1/songs',
            },
          },
        },
      },
    });
    let author = library.authors[0];
    assert.equal(author.name, 'TOOL');
    assert.equal(author.relationships.books, '/bands/1/songs');
  });
});
