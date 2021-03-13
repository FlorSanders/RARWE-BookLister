import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Book from 'rarwe/models/book';
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
    saveBook() {
        // Create new book (make use of context of the component to obtain author)
        let newBook = new Book({ title: this.title, author: this.model });
        // Add the book to our library
        this.library.add('book', newBook);
        // Add book to the context's author's book list
        this.model.books = [...this.model.books, newBook];
        // Reset the fields to their default value
        this.title = '';
        this.showAddBook = true;
    }

    @action
    cancel() {
        // Simply reset the values to their initial value
        this.title = '';
        this.showAddBook = true;
    }

}
