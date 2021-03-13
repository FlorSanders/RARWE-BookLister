import Service from '@ember/service';
import Author from 'rarwe/models/author';
import Book from 'rarwe/models/book';
// This tracked is different from the one in @glimmer/tracking: It is used as a function for elements built into an object
import { tracked } from 'tracked-built-ins';

function extractRelationships(object) {
    let relationships = {};
    Object.keys(object).forEach((name) => {
        if (name === 'songs') {
            relationships['books'] = object[name].links.related;
        } else if (name === 'band') {
            relationships['author'] = object[name].links.related;
        } else {
            relationships[name] = object[name].links.related;
        }
    });
    return relationships;
}

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

    async fetchAll(type) {
        if (type === 'authors') {
            let response = await fetch('/bands');
            let json = await response.json();
            this.loadAll(json);
            return this.authors;
        }
        if (type === 'books') {
            let response = await fetch('/books');
            let json = await response.json();
            this.loadAll(json);
            return this.books;
        }
    }

    loadAll(json) {
        let records = [];
        json.data.forEach((item) => {
            records.push(this._loadResource(item));
        });
        return records;
    }

    // Low-level functions that are expected to only be used locally are indicated with _ as a prefix
    _loadResource(data) {
        let { id, type, attributes, relationships } = data;
        let rels = extractRelationships(relationships)
        if (type === 'bands') {
            let newAuthor = new Author({ id, ...attributes }, rels);
            this.add('author', newAuthor);
            return newAuthor;
        }
        if (type === 'songs') {
            let newBook = new Book({ id, ...attributes }, rels);
            this.add('books', newBook);
            return newBook;
        }
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
