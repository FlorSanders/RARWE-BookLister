import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthorsAuthorBooksRoute extends Route {
    @service library;

    queryParams = {
        sortBy: {
            as: 's',
        },
        searchTerm: {
            as: 'q',
        }
    };

    async model() {
        let author = this.modelFor('authors.author');
        await this.library.fetchRelated(author, 'books');
        return author;
        // Returning a rejected promise can be used to check whether the errors are displayed correctly
        // return Promise.reject()
    }

    // Take care of the singleton behaviour: reset the controller when we switch pages
    resetController(controller) {
        controller.title = '';
        controller.showAddBook = true;
    }
}