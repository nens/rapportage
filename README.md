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

PROXY and STAGING
=================

Proxying to production/staging or deploying to staging is quite cumbersome.

For now it is not possible to deploy the same version to staging as to production namely:
The uuid of the rain raster is hardcoded in the root of the config.json.
When deploying to staging is absolutely required then change to the following line in the config.json:
"rainRasterStoreUUID":"3e5f56a7-b16e-4deb-8449-cc2c88805159",
This is the uuid of a rain raster available on staging. So this version will not work on production.
The same trick needs to be done when proxying to staging.

Proxying in general also requires a username password, but this is not configured in webpack.
You will need to configure this in webpack manually, but make sure not to commit this to git !
Below is an example of a proxy username password:

proxy: {
    '/api/v2': {
      target: 'https://demo.lizard.net/',
      secure: false,
      changeOrigin: true,
			auth: 'my_username:my_password'
    },

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




