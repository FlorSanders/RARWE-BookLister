import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Book from 'rarwe/models/book';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

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
        let payload = {
            data: {
                id: book.id,
                type: 'songs',
                attributes: {
                    rating,
                },
            },
        };
        await fetch(`/songs/${book.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(payload),
        });
    }

    @action
    async saveBook() {
        // Create the payload we will send
        let payload = {
            data: {
                type: 'songs',
                attributes: {
                    title: this.title,
                },
                relationships: {
                    band: {
                        data: {
                            id: this.model.id,
                            type: 'bands',
                        },
                    },
                },
            },
        };
        // Make post request and await response
        let response = await fetch('/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(payload),
        });
        let json = await response.json();
        let { id, attributes, relationships } = json.data;
        let rels = {}
        Object.keys(relationships).forEach((name) => {
            if (name === 'band') {
                rels['author'] = relationships[name].links.related;
            } else {
                rels[name] = relationships[name].links.related;
            }
        });
        let newBook = new Book({ id, ...attributes }, rels);
        // Add the book to our library
        this.library.add('books', newBook);
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
