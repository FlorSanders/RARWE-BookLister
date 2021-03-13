import Route from '@ember/routing/route';
// Again: inject = dependency, importing as service makes it more descriptive of what we're trying to achieve
import { inject as service } from '@ember/service';
import Author from 'rarwe/models/author';
import Book from 'rarwe/models/book';

export default class AuthorsRoute extends Route {
  @service library;

  model() {
    let book1 = new Book({
      title: `Be so good they can't ignore you`,
      rating: 4,
    });
    let book2 = new Book({
      title: `Deep work`,
      rating: 5,
    });
    let author1 = new Author({
      id: 'cal-newport',
      name: 'Cal Newport',
      books: [book1, book2],
    });
    book1.author = author1;
    book2.authors = author1;
    let book3 = new Book({
      title: `The age of surveillance capitalism`,
      rating: 4,
    });
    let author2 = new Author({
      id: 'shoshana-zuboff',
      name: 'Shoshana Zuboff',
      books: [book3],
    });
    book3.author = author2;
    let book4 = new Book({
      title: `Everything is fucked`,
      rating: 2,
    });
    let book5 = new Book({
      title: `The subtle art of not giving a fuck`,
      rating: 3,
    });
    let author3 = new Author({
      id: 'mark-manson',
      name: 'Mark Manson',
      books: [book4, book5],
    });
    book4.author = author3;
    book5.author = author3;
    let authors = [author1, author2, author3];
    let books = [book1, book2, book3, book4, book5];

    authors.forEach((author) => this.library.add('author', author));
    books.forEach((book) => this.library.add('book', book));

    return this.library.authors;
  }
}
