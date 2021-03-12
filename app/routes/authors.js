import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

class Author {
  // Ember's tracking mechanism can then take care of keeping the property's value in sync with the one rendered in the template.
  // Tracked properties are sort of comparable to a sensitivity list for changes that should cause rerenders somehow.
  @tracked name;

  constructor(name) {
    this.name = name;
  }
}

export default class AuthorsRoute extends Route {
  model () {
    return [
      new Author('Soshana Zuboff'),
      new Author('Cal Newport'),
      new Author('Mark Manson'),
    ];
  }
}
