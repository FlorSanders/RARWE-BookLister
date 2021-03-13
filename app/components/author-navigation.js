import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AuthorNavigationComponent extends Component {
    @service router;

    get isActive() {
        return {
            details: this.router.isActive('authors.author.details', this.args.author),
            books: this.router.isActive('authors.author.books', this.args.author),
        }
    }
}
