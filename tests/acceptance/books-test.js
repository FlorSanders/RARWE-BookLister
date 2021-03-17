import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

function testSortedTitles(titles, sortingFn, assert) {
  let sortedTitles = titles.sort(sortingFn);
  sortedTitles.forEach((title, index) => {
    assert.dom(`[data-test-rr="book-list-item"]:nth-child(${index+1})`).hasText(title, `Book ${index} has the right title`);
  });
}

module('Acceptance | books', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Sort songs in various ways', async function(assert) {
    // Define an author and some books
    let name1 = 'Cal Newport';
    let ratings = [3,5,2];
    let titles1 = ['Deep Work', 'A world without email', `Be so good they can't ignore you`];
    let ratings1 = {};
    titles1.forEach((title, index) => {ratings1[title] = ratings[index]});
    let author1 = this.server.create('band', {name: name1});
    titles1.forEach((title) => {
      this.server.create('song', {title, rating: ratings1[title], band: author1});
    });

    // Simulate user input
    await visit('/');
    await click('[data-test-rr="author-list-link"]');  // This will click on the first author link
    
    // Test-driven development: First write a test that reflects what you want to achieve, make sure it fails, build the component and make sure it succeeds
    /* PERFORM ACTUAL TESTS */
    // The books should initially be sorted in alphabetical order
    testSortedTitles(titles1, (a,b) => (a > b ? 1 : -1), assert);
    // Click on the button to sort by title, in descending order
    await click('[data-test-rr="sort-by-title-desc"]');
    testSortedTitles(titles1, (b,a) => (a > b ? 1 : -1), assert);
    assert.ok(currentURL().includes('s=-title', 'The sort query parameter appears with the correct value.'));
    // Sort by rating in ascending order
    await click('[data-test-rr="sort-by-rating-asc"]');
    testSortedTitles(titles1, (a,b) => (ratings1[a] > ratings1[b] ? 1 : -1), assert);
    assert.ok(currentURL().includes('s=rating', 'The sort query parameter appears with the correct value.'));
    // Sort by rating in descending order
    await click('[data-test-rr="sort-by-rating-desc"]');
    testSortedTitles(titles1, (b,a) => (ratings1[a] > ratings1[b] ? 1 : -1), assert);
    assert.ok(currentURL().includes('s=-rating', 'The sort query parameters appears with the correct value.'));
  });

  test('Search books', async function(assert) {
    // Define an author and some books
    let name1 = 'Cal Newport';
    let ratings = [3,5,2];
    let titles1 = ['Deep Work', 'A world without email', `Be so good they can't ignore you`];
    let ratings1 = {};
    titles1.forEach((title, index) => {ratings1[title] = ratings[index]});
    let author1 = this.server.create('band', {name: name1});
    titles1.forEach((title) => {
      this.server.create('song', {title, rating: ratings1[title], band: author1});
    });

    // Simulate user input
    await visit('/');
    await click('[data-test-rr="author-list-link"]'); // Will click on the first author link, here only 1's available anyway
    let filterElem = 'so';
    await fillIn('[data-test-rr="search-box"]', filterElem);
    // Actually filter the books
    let filteredTitles = titles1.filter((title) => (title.includes(filterElem)));
    assert.dom('[data-test-rr=book-list-item]').exists({count: filteredTitles.length}, 'The expected amount of titles are present after filtering');
    // Make sure we have them in the order we expect
    await click('[data-test-rr=sort-by-title-asc');
    let sortedFilteredTitles = filteredTitles.sort((a,b) => (a > b ? 1 : -1));
    sortedFilteredTitles.forEach((title, index) => {
      assert.dom(`[data-test-rr=book-list-item]:nth-child(${index+1})`).hasText(title, `Book ${index} has the right title after filtering and sorting`);
    });
    // Test whether the searchTerm qp actually turns up in the address
    assert.ok(currentURL().includes(`q=${filterElem}`), 'The searchTerm query parameter appears with the correct value');
  });
});
