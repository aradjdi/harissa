# HARISSA cli

## Installation

#### install dependencies

- image-to-ascii

It's recommended to install [Graphics Magick](http://www.graphicsmagick.org/). If it's not installed, the library will automagically try to install [`lwip`](https://www.npmjs.com/package/lwip) by compiling the C/C++ stuff.

```sh
# Ubuntu
$ sudo apt-get install graphicsmagick

# Fedora
$ sudo dnf install GraphicsMagick

# CentOS / RHEL
$ sudo yum install --enablerepo epel GraphicsMagick

# OS X
$ brew install graphicsmagick

# Windows users can install the binaries from http://www.graphicsmagick.org/
...or using the command line:
# Chocolatey (package manager for Windows)
# (Restart of cmd/PowerShell is required)
$ choco install graphicsmagick
```

- dev dependencies
> npm install

- add simlink
> npm link

## Get started
### Usage
```sh
# Init a project
$ harissa init --project-name <projectName> --project-id <projectId>

# Run & Watch for change on browser
$ harissa serve --env <dev|preprod|prod>

# Run on device
$ harissa run <smartphone|tablet> <android|ios> --env <dev|preprod|prod>

# Build Cordova project
$ harissa build <smartphone|tablet> --env <dev|preprod|prod> --build-version <patch|minor|major|versionNumber>

# Release IPA and APK files
$ harissa release <smartphone|tablet> --env <dev|preprod|prod>

# Upload to Appaloosa
$ harissa upload <smartphone|tablet> --env <dev|preprod|prod> --changes <"my change log">
```
