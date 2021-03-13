import Route from '@ember/routing/route';

export default class AuthorsNewRoute extends Route {
    // Again taking singleton behaviour into account, to throw away any unsaved information when switching pages
    resetController(controller) {
        controller.name = '';
        controller.confirmedLeave = false;
    }
}
