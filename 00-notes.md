npm init -y
npm install @11ty/eleventy --save-dev

make `.eleventy.js`
```js
module.exports = function(eleventyConfig) {
    return eleventConfig
};
```

LOCAL GIT SETUP

https://gist.github.com/oanhnn/80a89405ab9023894df7

To use multiple users on github, in ssh/config create a new host "github.com-dsriseah"
then you'd do `ssh -T github.com-dsriseah` to check authentication or `ssh -v github.com-dsriseah` to see verbose debugging information.


```
# set username for this repo dir
git init
git config user.name "<name>"
git config user.email "<email>"

# first line is different from what Github is suggesting
git remote add origin git@github.com-dsriseah:dsriseah/min-11ty-typescript.git
git branch -M main
git push -u origin main
```

setting up the `~/.ssh/config` file hosts
```
Host github.com-dsriseah
  HostName github.com
  User git
	IdentitiesOnly yes
	IdentityFile /Users/dsri/.ssh/dsriseah-github-ed25519
	PreferredAuthentications publickey
  UseKeychain yes
	AddKeysToAgent yes
```
If you are using multiple identifies:
* add `IdentitiesOnly yes` to config
* rewrite github origin to match Host you are using in .ssh/config


Visual Studio Code has typescript built in now, and I think that means I don't need to actually include it in the eslint chain?
`[Info  - 12:26:42.278] Using tsserver from: /Applications/Visual Studio Code.app/Contents/Resources/app/extensions/node_modules/typescript/lib/tsserver.js`

npm i -D eslint prettier typescript
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin 
npm i -D eslint-config-prettier eslint-plugin-import

include .eslintrc.js in tsconfig linting so this error doesn't show up:
```
Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: .eslintrc.js.
The file must be included in at least one of the projects provided. eslint
```
enable "formatOnSave" in workspace
