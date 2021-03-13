import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
// Inject refers to the underlying dependency needed for the services to work
// By importing it under the name of service, it is very declarative of what it does
import { inject as service } from '@ember/service';

export default class AuthorsNewController extends Controller {
    // Importing the library service, which serves as an application state manager
    @service library;
    // Router service makes it possible to transfer to a new page programattically
    @service router;
    // Tracked variables serve as a sensitivity list for rerenders of our application
    @tracked name;

    constructor() {
        super(...arguments);
        //If the user leaves the page while entering a new author, a warning should be given
        this.router.on('routeWillChange', (transition) => {
            if (transition.from.name === 'authors.new') {
                // If we already confirmed, don't make the box reappear
                if (this.confirmedLeave) {
                    return;
                }
                // Only abort once, then return... otherwise the cancel button causes an infinite loop
                if (transition.isAborted) {
                    return;
                }
                // Only if some text is entered into the field
                if (!!this.name) {
                    let leave = window.confirm("You have unsaved changes. Are you sure?");
                    console.log(leave);
                    if (leave) {
                        this.confirmedLeave = true;
                    } else {
                        transition.abort();
                    }
                }
            }
        })
    }

    @action
    updateName(e) {
        this.name = e.target.value;
    }

    @action
    async saveAuthor() {
        let newAuthor = await this.library.create('author', { name: this.name });
        this.confirmedLeave = true;
        this.router.transitionTo('authors.author.books', newAuthor.id);
    }
}
