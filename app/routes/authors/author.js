import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthorsAuthorRoute extends Route {
    @service library;

    model(params) {
        return this.library.find('author', (author) => author.id === params.id);
    }
}
