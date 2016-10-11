Changelog of rain_report
========================

1.3.1 (2016-11-06)
------------------

- Fixes ansible deploy. Now puts everything in a dist folder in the deploy
  directory. The config should be maintained in the deploy directory.


1.3.0 (2016-10-06)
------------------

- Bugfix, site now recognizes correctly when a region is configured.

- Updated modalinfo text.

- Fixes ansible deploy bug.


1.2.3 (2016-10-06)
------------------

- Bugfix, templates now point to correct template location.


1.2.1 (2016-10-06)
------------------

- config.json is collected through an ajax call (angulars $http) instead of
  directly including it through a webpack require.

- Moved config.json example to ./templates.

- Updated README.md.


1.2.0 (2016-10-06)
------------------

- moved modal templates.

- added integration deployement.

- renamed project from rapportage to rain_report.


1.1.0 (2016-10-05)
------------------

- config is imported in index.js rather than requesting it after the fact.

- Adds info modals.

- Fixes layer order in maps.

- Updates headers.

- Lizard SSO login.

- Fixes markers in other browsers than chrome.

- Leaves out last color in legend.


1.0.6 (2016-09-09)
------------------

- Adds config file.

- Alpha version.
