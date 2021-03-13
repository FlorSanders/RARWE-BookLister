import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AuthorListComponent extends Component {
    @service router;

    get authors() {
        console.log(this.args.authors)
        let authors = this.args.authors.filter((item) => !!item.id) // YAY I broke the API, now I have to filter out on id-less authors
        return authors.map((author) => ({
            author,
            isActive: this.router.isActive('authors.author', author),
        }));
    }
}
