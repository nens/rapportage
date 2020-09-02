# rapportage
Rapportage over de regenradar per gemeente.

## usage
Install nvm to get the right nodeJS version but without having to reinstall every time.  
Other clients use newer versions of nodeJS.  
Swithing back and forward between different nodeJS versions is hell.  
Nvm eases the pain (slightly).  
Follow instructions for installing nvm here or google yourself:  
https://hackernoon.com/how-to-install-node-js-on-ubuntu-16-04-18-04-using-nvm-node-version-manager-668a7166b854

If nvm is correctly installed use nvm to install nodeJS version 8.17.0:  

```sh
nvm install 8.17.0
```

You can check your nodeJS installations by doing "nvm ls". Version 8.17.0 should be there.  
Now tell nvm to use 8.17.0 for now:  

```sh
nvm use 8.17.0
```

Run npm install to install development dependencies:
```bash
npm install

Before you start on development move the file /app/templates/config.json.development to /app/config.json.  
The existing config.json file can be overwritten. The existing file might be a staging or production version (see also under release). 

# start the webpack dev server
./start

# start the test runner in another terminal screen/window
npm test
```

The `app/index.html` and `app/index.js` define the starting points of the app.
If you like to get started with development look there. It starts the angular
app and sets up the basic html

PROXY and STAGING
=================

The rain report on dev proxies to production by default.  
In order for this to work open the dev server by running the ./start commando so not npm start (see above).  
I (Tom) have not tested proxying to staging.  
Currently on staging another rain raster uuid is used then on prod and dev.  The app will automatically detect if it is on staging and use this uuid.  


Releasing
=========

! IMPORTANT READ THIS !
Unfortuenedly the config.json file used by the app is sometimes changed directly on the server by advicers.  
Before making a release it is thus important to retrieve the latest version of the file from the server.  
This also implicates that a release should only be made right before deploying !

Use the secure copy command to retrieve the file from the server (need to be authenticated on server).  

  scp your_username@<production_server>:/srv/nxt.lizard.net-clients/rain_report/config.json /home/tomdeboer/dev/rain_report/app/templates/config.json.prod 

Now move this file to /app/config.json and make the changes you need to it.  

Now run make a distributable file 

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




