import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

class Author {
  // Ember's tracking mechanism can then take care of keeping the property's value in sync with the one rendered in the template.
  // Tracked properties are sort of comparable to a sensitivity list for changes that should cause rerenders somehow.
  @tracked name;

  constructor({id, name, books}) {
    this.id = id;
    this.name = name;
    this.books = books;
  }
}

class Book {
  constructor({title, rating, author}) {
    this.title = title;
    this.rating = rating ?? 0;
    this.author = author;
  }
}

export default class AuthorsRoute extends Route {
  model () {
    let book1 = new Book({
      title: `Be so good they can't ignore you`,
      rating: 4,
      author: 'Cal Newport',
    });
    let book2 = new Book({
      title: `Deep work`,
      rating: 5,
      author: 'Cal Newport',
    });
    let author1 = new Author({
      id: 'cal-newport',
      name: 'Cal Newport',
      books: [book1, book2],
    });
    let book3 = new Book({
      title: `The age of surveillance capitalism`,
      rating: 4,
      author: 'Shoshana Zuboff',
    });
    let author2 = new Author({
      id: 'shoshana-zuboff',
      name: 'Shoshana Zuboff',
      books: [book3],
    });
    let book4 = new Book({
      title: `Everything is fucked`,
      rating: 2,
      author: 'Mark Manson',
    });
    let book5 = new Book({
      title: `The subtle art of not giving a fuck`,
      rating: 3,
      author: 'Mark Manson',
    });
    let author3 = new Author({
      id: 'mark-manson',
      name: 'Mark Manson',
      books: [book4, book5],
    });
    console.log(author3)
    return [author1, author2, author3];
  }
}
