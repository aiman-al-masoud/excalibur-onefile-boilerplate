# Excalibur Boilerplate


A simple 'boilerplate' to play around with <a href="https://excaliburjs.com/">this awesome library </a>. Webpack is set up to package your game into a single HTML file with inline resources.


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
... this will generate the 'production-ready' file `/dist/index.html`, which you can open from any browser.

or:

```
yarn run dev-build
```

... this will instead generate a development build with un-minified names and errors (easier to debug), always at the same location `/dist/index.html`.

### 6. Enjoy!



## Attributions:


<a href="./app/res/attribs.md">./app/res/attribs.md</a>
