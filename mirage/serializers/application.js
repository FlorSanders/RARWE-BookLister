import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
    links(resource) {
        let {id, modelName} = resource;
        // Make sure the mirage response looks as much as what we expect from our true backend
        if (modelName === 'band') {
            return {
                songs: {
                    related: `/bands/${id}/songs`,
                    self: `/bands/${id}/relationships/songs`,
                },
            };
        }
    }
});
