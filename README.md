# React Boilerplate

<div style="display: flex; flex-direction: row;">
<img  src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
<img  src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
<img  src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" />
<img  src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black" />
<img  src="https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white" />
<img  src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
</div>







A boilerplate for React projects in Typescript, with inline css and multimedia resource inclusion (in the form of base64 strings), that builds and packages everything using Webpack into a single html file.

Ideal for SPAs (Single Page Applications), or to practice on TypeScript. 



## Set-up and usage (On Linux.)

### 1. Clone this repository

... and open up its root directory


### 2. Install yarn on your computer:

(You can skip to step 3, if you already have yarn).

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update 
sudo apt install yarn
```

Source: <a href="https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable
">https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable</a>


### 3. Update to the latest LTS version of node:

(You can skip to step 4, if you already have one of the latest versions of node).


#### Check your version of node:

```
node -v
```

#### Install NVM (Node Version Manager):

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
```

Restart your terminal window. Then verify that nvm was successfully installed:

```
command -v nvm
```
#### Look-up the latest nvm version:

```
nvm ls-remote
```
Will list all of the nodejs versions available for download. 

#### Install the latest

Copy the version code of the latest LTS version of node and paste it in place of `XX.XX.XX` in the command below:

```
nvm install XX.XX.XX
```

This will install the version of node you selected.



Source: <a href="https://medium.com/nethues-technologies/how-to-update-node-version-on-linux-9f18450e70dc
">https://medium.com/nethues-technologies/how-to-update-node-version-on-linux-9f18450e70dc</a>




### 4. Install this boilerplate's dependencies: 

```
yarn install
```
... in the project's root directory, to install this project's dependencies.

### 5. To build the single page application from source, run:

```
yarn run build
```
... this will generate the (production-ready) file `/dist/index.html`, which you can open from any browser.

or:

```
yarn run dev-build
```

... this will instead generate a development build with un-minified names and errors (easier to debug), always at the same location `/dist/index.html`.

### 6. Enjoy!



## Attributions:

### The sources for the multimedia content used for the examples are listed in:

<a href="./app/res/attribs.md">./app/res/attribs.md</a>

### This api is used as an example of pinging a server:

<a href="http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=xml">http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=xml</a>


## Useful Resources:

#### Official Documentation:

<a href="https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example">https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example</a>


#### Basic Data Types:

<a href="https://www.typescriptlang.org/docs/handbook/basic-types.html#table-of-contents">https://www.typescriptlang.org/docs/handbook/basic-types.html#table-of-contents</a>

#### Types vs Interfaces:

<a href="https://blog.logrocket.com/types-vs-interfaces-in-typescript/">https://blog.logrocket.com/types-vs-interfaces-in-typescript/</a>

#### Interface Functions

<a href="https://medium.com/@jeffbutsch/typescript-interface-functions-c691a108e3f1">https://medium.com/@jeffbutsch/typescript-interface-functions-c691a108e3f1</a>

