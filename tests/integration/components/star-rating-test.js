import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | star-rating', function(hooks) {
  setupRenderingTest(hooks);

  test('Renders the full and empty stars correctly', async function(assert){
    // Set component variables and functions
    let initialRating = 4;
    let maxRating = 5;
    this.set('rating', initialRating);
    this.set('maxRating', maxRating);
    this.set('updateRating', () => {});
    
    // Render out the component
    await render(hbs`<StarRating @rating={{this.rating}} @maxRating={{this.maxRating}} @onUpdate={{this.updateRating}} />`);

    /* PERFORM ACTUAL TESTS */
    // Is the right amount of full stars depicted
    assert.dom('[data-test-rr="full-star"]').exists({count: initialRating}, 'The right amount of full stars is rendered');
    assert.dom('[data-test-rr="empty-star"]').exists({count: maxRating - initialRating}, 'The right amoung of empty stars is rendered');
    // Changing the amount of full stars and the maxRating and checking again
    let newRating = 2;
    let newMaxRating = 7;
    this.set('rating', newRating);
    this.set('maxRating', newMaxRating);
    // You can use the pauseTest() feature to see what's rendering.
    // await this.pauseTest();
    assert.dom('[data-test-rr="full-star"]').exists({count: newRating}, 'The right amount of full stars is rendered');
    assert.dom('[data-test-rr="empty-star"]').exists({count: newMaxRating - newRating}, 'The right amoung of empty stars is rendered');
  });

  test('Calls onAction with the correct value', async function(assert){
    // Set component variables and functions
    let initialRating = 4;
    let maxRating = 5;
    this.set('rating', initialRating);
    this.set('maxRating', maxRating);
    this.set('updateRating', (rating) => {
      // You can manually add steps the process is going through which you can check afterwards
      assert.step(`Updated to rating: ${rating}`);
      // Very useful to e.g. check race conditions/order of calls to be made
    });
    
    // Render out the component
    await render(hbs`<StarRating @rating={{this.rating}} @maxRating={{this.maxRating}} @onUpdate={{this.updateRating}} />`);

    // Click one of the star buttons and verify the steps taken
    let ratingClicked = 3;
    await click(`[data-test-rr="star-rating-button"]:nth-child(${ratingClicked})`);
    // The added steps can be verified like this
    assert.verifySteps([`Updated to rating: ${ratingClicked}`]);
  });
});
