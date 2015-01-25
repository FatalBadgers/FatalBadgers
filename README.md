# iHammer

> A marketplace that matches skilled workers to the people who need them.

[![Stories in Ready](https://badge.waffle.io/fatalbadgers/fatalbadgers.png?label=ready&title=Ready)](http://waffle.io/fatalbadgers/fatalbadgers)

[![Build Status](https://travis-ci.org/FatalBadgers/FatalBadgers.svg?branch=dev)](https://travis-ci.org/FatalBadgers/FatalBadgers)

## Team

  - __Product Owner__: Yan Fan
  - __Scrum Master__: Kevin Primat
  - __Development Team Members__: Tim Martin, Scott Rice

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

```sh
grunt serve
```
Browser window will open at localhost with the app.

## Requirements

- Node 0.10.x
- Express
- AngularJS

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Setting Up the Database

With mysql installed, use the user root and an empty password to create a database called 'ihammer':

```sh
mysql -u root
> create database ihammer;
```

### Unit and Integration tests

Running grunt test will run the client and server unit tests with karma and mocha.

Use grunt test:server to only run server tests.

Use grunt test:client to only run client tests.

### Protractor tests

To setup protractor e2e tests, you must first run

npm run update-webdriver

Use grunt test:e2e to have protractor go through tests located in the e2e folder.

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
