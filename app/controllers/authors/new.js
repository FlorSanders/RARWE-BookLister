import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { tracked } from '@glimmer/tracking';
import Author from 'rarwe/models/author';
// Inject refers to the underlying dependency needed for the services to work
// By importing it under the name of service, it is very declarative of what it does
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class AuthorsNewController extends Controller {
    // Importing the library service, which serves as an application state manager
    @service library;
    // Router service makes it possible to transfer to a new page programattically
    @service router;
    // Tracked variables serve as a sensitivity list for rerenders of our application
    @tracked name;

    @action
    updateName(e) {
        this.name = e.target.value;
    }

    @action
    async saveAuthor() {
        // Post the information to the backend
        let response = await fetch('/bands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify({
                data: {
                    type: 'bands',
                    attributes: {
                        name: this.name,
                    },
                },
            }),
        });
        // Await its response
        let json = await response.json;
        // Make new author object from the attributes in our data --> Creating a unique id is the responsibility of the backend now!
        let { id, attributes } = json.data;
        let newAuthor = new Author({ id, ...attributes });
        // Use the library service to add it to our collection
        this.library.add('author', newAuthor);
        // Transfer to the page of the new author
        this.router.transitionTo('authors.author.books', id);
    }
}
