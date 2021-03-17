// Mirage serves as a stubbed backend (mocking) for our test suite.
// Mirage is smart enough to figure out what it should return somehow...
export default function() {
  this.get('/bands');
  this.get('/bands/:id');
}
