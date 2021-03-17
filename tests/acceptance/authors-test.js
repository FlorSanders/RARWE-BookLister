import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { getPageTitle } from 'ember-page-title/test-support';

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

    // Perform tests
    // Are we on the right page?
    assert.equal(getPageTitle(), 'Authors | B00kL1st3r');
    // Are all authors rendered
    let authorLinks = document.querySelectorAll('.mb-2 > a');
    assert.equal(authorLinks.length, authors.length, 'All author links are rendered');
    // Are the rendered authors correct?
    authors.forEach((author, index) => {
      assert.ok(authorLinks[index].textContent.includes(author),`Author link ${index} contains the author name`);
    });
  });
});
