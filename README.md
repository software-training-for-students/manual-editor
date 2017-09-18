# STS Manual Editor
This editor is used by University of Wisconsin-Madison DoIT Software Training for Students to develop classroom manuals.
## Usage
This editor works in Google Chrome and Microsoft Edge. It may work in Firefox, but it is untested.
The menu on top can be used to add elements. To edit an element, click on it. Some elements have some grey text that says `Click here to edit the *item* below`. For those elements, click on the text to edit them.
### Importing Old Manuals Written in Raw HTML
Just click on the import button! The application will walk you through how to import the manuals.
## The .sts Format
The `.sts` format is actually just a zip file. The files within are as follows:
* `manual.json`: This file specifies all of the content within your manual.
* `version`: This file contains a version number of the file format. This enables the application to easily upgrade manuals when there are breaking changes.
* Other files: Any other files are image files that are used in the manual.
## Developing the Manual Editor
The manual editor currently uses Typescript, React, Redux, and Webpack, along with TSLint for linting. To start developing, clone the repository and check out the master branch.

Install a newer (v4.2.0 or newer) version of npm and run `npm install` in the repository. You should be able to develop now! There are config files for VSCode already checked in, so I suggest you use that to develop. To build from the command line, run `npm run build`. To build a release, run `npm run pack`. To test, open the index.html from the build folder in a browser.

## Making a Release
To make a release, first remove your build directory to ensure you don't release any old or unused files. Then run `npm run pack`. Open up a local copy of the `software-training-for-students.github.io` repository. Copy the files from the build directory and paste them in the `editor` directory of the `software-training-for-students.github.io` repository.