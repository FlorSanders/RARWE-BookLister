import { tracked } from '@glimmer/tracking';

export default class Book {
    @tracked rating;
    constructor({ id, title, rating, author }, relationships = {}) {
        this.id = id;
        this.title = title;
        this.rating = rating ?? 0;
        this.author = author;
        this.relationships = relationships;
    }
}