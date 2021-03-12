import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { tracked } from '@glimmer/tracking';
import { Author } from 'rarwe/routes/authors';

export default class AuthorsNewController extends Controller {
    @tracked name;

    @action
    updateName(e) {
        
        this.name = e.target.value;
    }

    @action
    saveAuthor() {
        new Author({name: this.name, id: dasherize(this.name)})
    }
}
