# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.5.1"></a>
## [1.5.1](https://github.com/nens/rain_report/compare/v1.5.0...v1.5.1) (2016-11-04)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/nens/rain_report/compare/v1.4.0...v1.5.0) (2016-11-04)


### Features

* **print:** Makes rain reports printable. ([d581a49](https://github.com/nens/rain_report/commit/d581a49))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/nens/rain_report/compare/1.3.2...v1.4.0) (2016-10-27)


### Bug Fixes

* **submodule:** submodule not instantiated properly ([00d5490](https://github.com/nens/rain_report/commit/00d5490))


### Features

* **releasing:** added buck-trap and client-deployment ([aabebb3](https://github.com/nens/rain_report/commit/aabebb3))


==========================
This is where we changed the way we do changelogs. First we did this by hand. We now use nens/buck-trap. It uses the commit messages to create a changelog.

The changelogs for the releases 4.1.16 and 4.2.0 (and everything in between) might suffer because of it. Because we didn't merge everything properly. After this all should be fine and fixed.
==========================


Changelog of rain_report
========================

1.3.2 (2016-11-06)
------------------

- Adds apps button.


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
