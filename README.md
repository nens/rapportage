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

To deploy this project to integration or staging, make sure to do the following:

* Copy `deploy/hosts.example` to `deploy/hosts` and edit the servers under [integration] and/or [staging]. For production, do the same but in a copy of `deploy/production_hosts.example`.

* Copy `deploy/auth.json.example` to `deploy/auth.json` and make sure that your [Github token](https://github.com/settings/tokens) is filled out. The access token needs full repo access, so make sure to select the right scopes when creating the token.

Make sure you have Ansible [installed on your system](http://docs.ansible.com/ansible/intro_installation.html).

Run:
```
$ ansible-playbook -i deploy/hosts deploy/deploy.yml -k -K --limit=integration -u your.username --extra-vars="version=0.1.0"
```

Where `--limit` is a safety measure to deploy only to that host and `--extra-vars "version=0.1.0"` defines [which version](https://github.com/nens/kpi-dashboard/releases) to release.
