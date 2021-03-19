import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | capitalize', function(hooks) {
  setupRenderingTest(hooks);

  test('It capitalizes each word', async function(assert) {
    this.set('title', 'george orwell');
    await render(hbs`{{capitalize title}}`);
    assert.dom(this.element).hasText('George Orwell');
    this.set('title', 'JK rowling');
    assert.dom(this.element).hasText('JK Rowling');
  })
});
