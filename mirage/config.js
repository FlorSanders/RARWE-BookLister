// Mirage serves as a stubbed backend (mocking) for our test suite.

import { clearConfigCache } from "prettier";

// Mirage is smart enough to figure out what it should return somehow...
export default function() {
  this.get('/bands');
  this.get('/bands/:id');
  this.post('/bands');
  this.get('/bands/:id/songs', function(schema, request) {
    let id = request.params.id;
    return schema.songs.where({bandId: id});
  })
}
