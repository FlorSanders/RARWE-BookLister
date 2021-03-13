import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AuthorListComponent extends Component {
    @service router;

    get authors() {
        console.log(this.args.authors)
        return this.args.authors.map((author) => ({
            author,
            isActive: this.router.isActive('authors.author', author),
        }));
    }
}
