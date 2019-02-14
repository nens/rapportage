# rapportage
Rapportage over de regenradar per gemeente.

## usage
```bash
npm install

# start the webpack dev server
npm start

# start the test runner in another terminal screen/window
npm test
```

The `app/index.html` and `app/index.js` define the starting points of the app.
If you like to get started with development look there. It starts the angular
app and sets up the basic html

Releasing
=========
To start off, make sure webpack has a built version in the dist folder 

	npm run build

This creates a build in the dist/ folder.

To tag this as a new release and to add the dist folder to the release attachments you we use nens/buck-trap. It versions your repo and changes the changelog for you.

	npm run buck-trap

NOTE: buck-trap assumes:
    There is a package.json.
    You release from master branch.
    There is a dist folder which will be attached to the release on github

Releasing hotfixes or patches

If a stable release is coming out release it and start a new branch for the stable release e.g.:

	git checkout -b release4.0

If stuff is fixed on this branch, the fixes can be rolled out as patches without affecting the mainline release track. To run buck-trap from this branch and to release the branch with its CHANGELOG.md

	npm run buck-trap -- -b release4.0

The fixes and the CHANGELOG.md would have to be merged with master, which might give some merge conflicts. C'est la vie.


Deployment
==========

For the deployment of frontend repositories we make use of an Ansible script in the lizard-nxt repository.
More information is provided in the readme file of lizard-nxt: https://github.com/nens/lizard-nxt/blob/master/README.rst
Look below the heading "Deployment clients".