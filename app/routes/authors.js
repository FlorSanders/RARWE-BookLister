import Route from '@ember/routing/route';
// Again: inject = dependency, importing as service makes it more descriptive of what we're trying to achieve
import { inject as service } from '@ember/service';
import Author from 'rarwe/models/author';

export default class AuthorsRoute extends Route {
  @service library;

  async model() {
    return this.library.fetchAll('authors');
  }
}
