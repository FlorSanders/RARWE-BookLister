import { tracked } from '@glimmer/tracking';

export default class Book {
    constructor({ title, rating, author }) {
        this.title = title;
        this.rating = rating ?? 0;
        this.author = author;
    }
}