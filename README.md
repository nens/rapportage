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

## Releasing and Deployment
Releasing is pretty straightforward. Consisting of only a few steps. Defining the kind of release:
patch (default), minor or major. Running the release script and afterwards running the script to
upload the release tarball.

* Draft a release with `npm run release -- <release_type>`, where `release_type` can be any of the following
    * `major` (e.g. 1.0.0 becomes 2.0.0)
    * `minor` (e.g. 1.0.0 becomes 1.1.0)
    * `patch` (e.g. 1.0.0 becomes 1.0.1 this is the default)
* Make sure webpack has a built version in the dist folder `npm run build`
* Create & Upload zip of the dist folder `npm run release-asset`

Deployment uses the zip that is uploaded to github under the version name. So update the
`version_name` in the group_vars (or individual files).

The `staging.example` and `production.example` can be copied. Just change the server names
under the right heading.

```
ansible-playbook -i deploy/staging deploy/deploy.yml -K -u <user.name>
```
