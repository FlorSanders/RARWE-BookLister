import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | authors/author/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:authors/author/index');
    assert.ok(route);
  });
});
