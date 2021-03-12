import Component from '@glimmer/component';

export default class StarRatingComponent extends Component {
    // This is a property defined upon this class, rather than a function.
    get maxRating() {
        return this.args.maxRating ?? 5;
    }

    get stars() {
        let stars = [...Array(this.maxRating)].map((_,i) => ({
            rating: (i+1),
            full: (i+1) <= this.args.rating,
        }));
        return stars
    }
}
