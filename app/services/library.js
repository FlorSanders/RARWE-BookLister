import Service from '@ember/service';
import Author from 'rarwe/models/author';
import Book from 'rarwe/models/book';
// This tracked is different from the one in @glimmer/tracking: It is used as a function for elements built into an object
import { tracked } from 'tracked-built-ins';
import { isArray } from '@ember/array';

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

    async create(type, attributes, relationships = {}) {
        let payload = {
            data: {
                type: type === 'author' ? 'bands' : 'songs',
                attributes,
                relationships
            },
        };
        let response = await fetch(type === 'author' ? '/bands' : '/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(payload),
        });
        let json = await response.json();
        return this.load(json);
    }

    async update(type, record, attributes) {
        let payload = {
            data: {
                id: record.id,
                type: type === 'author' ? 'bands' : 'songs',
                attributes,
            },
        };
        let url = `/${type === 'author' ? 'bands' : 'songs'}/${record.id}`;
        await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/vnd.api+json',
            },
            body: JSON.stringify(payload),
        });
    }

    load(response) {
        return this._loadResource(response.data)
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

    async fetchRelated(record, relationship) {
        let url = record.relationships[relationship];
        console.log(url)
        let response = await fetch(url);
        let json = await response.json();
        if (isArray(json.data)) {
            record[relationship] = this.loadAll(json);
        } else {
            record[relationship] = this.load(json);
        }
        return record[relationship];
    }

    add(type, record) {
        let collection = type === 'author' ? this.storage.authors : this.storage.books;
        // We want the elements in our collections to be unique, not checking this explicitly results in duplicates being loaded into memory
        // Result is a so-called identity map --> More efficient implementation is possible by using actual maps or POJOs (plain old javascript object)
        let recordIds = collection.map((record) => record.id);
        if (!recordIds.includes(record.id)) {
            collection.push(record);
        }
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
