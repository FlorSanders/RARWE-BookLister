import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Book from 'rarwe/models/book';
import fetch from 'fetch';

export default class AuthorsAuthorBooksRoute extends Route {
    @service library;

    async model() {
        let author = this.modelFor('authors.author');
        let url = author.relationships.books;
        let response = await fetch(url);
        let json = await response.json();
        let books = [];
        let rels = {};
        json.data.forEach((item) => {
            let { id, attributes, relationships } = item;
            Object.keys(relationships).forEach((name) => {
                if (name === 'band') {
                    rels['author'] = relationships[name].links.related;
                } else {
                    rels[name] = relationships[name].links.related;
                }
            });
            let newBook = new Book({ id, ...attributes }, rels);
            books.push(newBook);
            this.library.add('books', newBook);
        });
        author.books = books;

        return author;
    }

    // Take care of the singleton behaviour: reset the controller when we switch pages
    resetController(controller) {
        controller.title = '';
        controller.showAddBook = true;
    }
}