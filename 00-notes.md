npm init -y
npm install @11ty/eleventy --save-dev

make `.eleventy.js`
```js
module.exports = function(eleventyConfig) {
    return eleventConfig
};
```


https://gist.github.com/oanhnn/80a89405ab9023894df7

To use multiple users on github, in ssh/config create a new host "github.com-dsriseah"
then you'd do `ssh -T github.com-dsriseah` to check authentication

git config user.name "<name>"
git config user.email "<email>"


git remote add origin git@github.com:dsriseah/min-11ty-typescript.git
git branch -M main
git push -u origin main

