import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthorsAuthorBooksController extends Controller {
    @service library;
    @tracked showAddBook = true;
    @tracked title = '';

    @action
    updateTitle(e) {
        this.title = e.target.value;
    }

    @action
    async updateRating(book, rating) {
        book.rating = rating;
        this.library.update('books', book, { rating });
    }

    @action
    async saveBook() {
        let newBook = await this.library.create('books', { title: this.title }, { band: { data: { id: this.model.id, type: 'bands' } } });
        this.model.books = [...this.model.books, newBook];
        this.cancel();
    }

    @action
    cancel() {
        // Simply reset the values to their initial value
        this.title = '';
        this.showAddBook = true;
    }

}
