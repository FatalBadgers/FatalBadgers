# iHammer

A marketplace that matches skilled workers to the people who need them.

[![Stories in Ready](https://badge.waffle.io/fatalbadgers/fatalbadgers.png?label=ready&title=Ready)](http://waffle.io/fatalbadgers/fatalbadgers)

[![Build Status](https://travis-ci.org/FatalBadgers/FatalBadgers.svg?branch=dev)](https://travis-ci.org/FatalBadgers/FatalBadgers)

## Team

  - __Product Owner__: [Yan Fan](https://github.com/yanarchy)
  - __Scrum Master__: [Kevin Primat](https://github.com/kxprim)
  - __Lead Architect__: [Tim Martin](https://github.com/tmartin1)
  - __Build Master__: [Scott Rice](https://github.com/scottrice10)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)

## Usage

```sh
grunt serve
```
Browser window will open at localhost:9000 with the app.

In order for the photo upload directive to work correctly, you will need to change aws.example.json > aws.json, and fill
in your accessKeyId, secretAccessKey, region, and bucket.

## Requirements

- Node 0.10.x
- Express
- AngularJS

## Development

When installing locally, running grunt serve will open the app:

```sh
grunt serve
```
Browser window will open automatically at localhost:9000.

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Unit and Integration tests

Running grunt test will run the client and server unit tests with karma and mocha.

Use ```grunt test:server``` to only run server tests.

Use ```grunt test:client``` to only run client tests.

### Protractor tests

To setup protractor e2e tests, you must first run

```SH
npm run update-webdriver
```

Use ```grunt test:e2e``` to have protractor go through tests located in the e2e folder.

### Roadmap

View the [project roadmap](https://github.com/FatalBadgers/FatalBadgers/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

When pull requests are accepted, the changes are automatically visible on our [staging server] (http://staging.ihammer.org)
