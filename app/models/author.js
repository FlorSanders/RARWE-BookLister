import { tracked } from '@glimmer/tracking';

export default class Author {
    // Ember's tracking mechanism can then take care of keeping the property's value in sync with the one rendered in the template.
    // Tracked properties are sort of comparable to a sensitivity list for changes that should cause rerenders somehow.
    @tracked name;
    @tracked books;

    constructor({ id, name, books }, relationships = {}) {
        this.id = id;
        this.name = name;
        this.books = books ?? []; // Alternative would be to use books || [], which would replace any value that could be interpreted as false.
        this.relationships = relationships;
    }
}