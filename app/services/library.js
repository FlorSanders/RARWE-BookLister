import Service from '@ember/service';
// This tracked is different from the one in @glimmer/tracking: It is used as a function for elements built into an object
import { tracked } from 'tracked-built-ins';

export default class LibraryService extends Service {
    // Problem! Storage is tracked now, but the components within it aren't
    // As long as these aren't deleted, we will not see changes as updates
    // Solution: Tracked-built-ins plugin
    // @tracked storage = {};
    storage = {}

    constructor() {
        super(...arguments);
        this.storage.authors = tracked([]);
        this.storage.books = tracked([]);
    }

    add(type, record) {
        let collection = type === 'author' ? this.storage.authors : this.storage.books;
        collection.push(record);
    }

    get authors() {
        return this.storage.authors;
    }

    get books() {
        return this.storage.books;
    }

    find(type, filterFn) {
        let collection = type === 'author' ? this.storage.authors : this.storage.books;
        return collection.find(filterFn);
    }

}
