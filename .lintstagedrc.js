// prettier-ignore
module.exports = {
  '*.{scss,sass,css}': [
    'stylelint "src/**/*.{css,scss,sass}" --fix --config ./.stylelintrc.js',
  ],
  '*.{js,jsx,ts,tsx}': [
    'eslint "src" --ext .ts,.tsx --fix',
  ],
  '*.test.tsx': [
    'eslint --fix',
    'yarn test',
  ],
}
