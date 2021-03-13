import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthorsAuthorIndexRoute extends Route {
    @service router;

    redirect(author) {
        if (!!author.description) {
            this.router.transitionTo('authors.author.details');
        } else {
            this.router.transitionTo('authors.author.books');
        }
    }
}
