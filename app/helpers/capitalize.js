import { helper } from '@ember/component/helper';

export default helper(capitalize);

export function capitalize(input) {
  // PascalCase each word in the string
  let words = input.toString().split(/\s+/).map((word) => (word[0].toUpperCase() + word.slice(1)));
  return words.join(' ');
}
