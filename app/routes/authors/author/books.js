import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthorsAuthorBooksRoute extends Route {
    @service library;

    async model() {
        let author = this.modelFor('authors.author');
        await this.library.fetchRelated(author, 'books');
        return author;
    }

    // Take care of the singleton behaviour: reset the controller when we switch pages
    resetController(controller) {
        controller.title = '';
        controller.showAddBook = true;
    }
}