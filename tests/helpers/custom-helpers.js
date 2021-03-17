import {click, fillIn} from '@ember/test-helpers';

export async function createAuthor(name) {
    await click('[data-test-rr="new-author-button"]');
    await fillIn('[data-test-rr="new-author-name"]', name);
    await click('[data-test-rr="save-author-button"]');
}