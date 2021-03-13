import Route from '@ember/routing/route';

export default class AuthorsAuthorBooksRoute extends Route {
    // DEFAULT: Model hook returns the model for the parent structure --> NICE
    // Take care of the singleton behaviour: reset the controller when we switch pages
    resetController(controller) {
        controller.title = '';
        controller.showAddBook = true;
    }

    // model() {
    //     let author = this.modelFor('authors.author');
    //     return author.books;
    // }

    // // Controller setup: add the author to the context so we can edit it
    // setupController(controller) {
    //     super.setupController(...arguments);
    //     controller.set('author', this.modelFor('authors.author'));
    // }
}