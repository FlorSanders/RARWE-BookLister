import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { capitalize } from 'rarwe/helpers/capitalize';

export default class AuthorsAuthorBooksController extends Controller {
    @service library;
    @tracked showAddBook = true;
    @tracked title = '';
    @tracked sortBy = 'title';
    @tracked searchTerm = '';

    get matchingBooks() {
        let searchTerm = this.searchTerm.toLowerCase();
        let filteredBooks = this.model.books.filter((book) => (book.title.toLowerCase().includes(searchTerm)));
        return filteredBooks;
    }

    get sortedBooks() {
        let sortBy = this.sortBy;
        let isDescendingSort = sortBy[0] === '-';
        sortBy = isDescendingSort ? sortBy.slice(1) : sortBy;

        // The [...array] makes a copy of the array to make sure it isn't mutated 
        let sortedBooks = this.matchingBooks.sort((a,b) => (isDescendingSort ? (b[sortBy] > a[sortBy] ? 1 : -1) : (a[sortBy] > b[sortBy] ? 1 : -1)));
        return sortedBooks;
    }

    @action
    updateTitle(e) {
        this.title = e.target.value;
    }

    @action
    updateSearchTerm(e) {
        this.searchTerm = e.target.value;
    }

    @action
    async updateRating(book, rating) {
        book.rating = rating;
        this.library.update('books', book, { rating });
    }

    get newBookPlaceholder() {
        let author = this.model.name;
        return `${capitalize(author)}'s new book`;
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
