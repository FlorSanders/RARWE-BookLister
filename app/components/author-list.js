import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AuthorListComponent extends Component {
    @service router;

    get authors() {
        let authors = this.args.authors;
        return authors.map((author) => ({
            author,
            isActive: this.router.isActive('authors.author', author),
        }));
    }
}
