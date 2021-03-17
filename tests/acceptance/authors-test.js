import { module, test } from 'qunit';
import { visit, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
import { createAuthor } from 'rarwe/tests/helpers/custom-helpers';

module('Acceptance | authors', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('List authors', async function(assert) {
    // Create some authors using the server API
    let authors = ['Cal Newport', 'Mark Manson'];
    authors.forEach((author) => {
      this.server.create('band', {name: author});
    });

    // Visit the homepage which lists the bands
    await visit('/');

    /* PERFORM THE ACTUAL TESTS */
    // Are we on the right page?
    assert.equal(getPageTitle(), 'Authors | B00kL1st3r');
    // Are all authors rendered
    assert.dom('[data-test-rr="author-list-link"]').exists({count: authors.length }, 'All author links are rendered');
    // Are the rendered authors correct?
    authors.forEach((author, index) => {
      assert.dom(`[data-test-rr="author-list-item"]:nth-child(${index+1})`).hasText(author, `Author link ${index} contains the author name`);
    });
  });

  test('Create an author', async function(assert){
    // Turn the option below on if you want to have the "server calls" to mirage printed in the console
    // this.server.logging = true;
    // Initialize server with some data
    let authors = ['Cal Newport', 'Mark Manson'];
    authors.forEach((author) => {
      this.server.create('band', {name: author});
    });

    // Automate user inputs to create new author
    await visit('/');
    let newAuthor = 'Shoshana Zuboff';
    createAuthor(newAuthor);
    // Wait until the new author actually gets added and the routing transition happens
    await waitFor('[data-test-rr="no-books-text"]'); // This is the text that gets printed when no songs are available yet

    /* PERFORM TESTS */
    // Are all authors present?
    assert.dom('[data-test-rr="author-list-link"]').exists({count: authors.length + 1 }, 'All author links are rendered');
    // Is their name rendered correctly?
    authors.forEach((author, index) => {
      assert.dom(`[data-test-rr="author-list-item"]:nth-child(${index+1})`).hasText(author, `Author link ${index} contains the author name`);
    });
    assert.dom('[data-test-rr="author-list-item"]:last-child').hasText(newAuthor, `New author link contains the new author's name`);
    // Are we redirected to the author's tab?
    assert.dom('[data-test-rr="books-nav-item"] > .active').exists('The books tab is active'); 
  });
});
