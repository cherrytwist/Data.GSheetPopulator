<p align="center">
  <a href="http://cherrytwist.org/" target="blank"><img src="https://cherrytwist.org/wp-content/uploads/2020/10/cherrytwist-2.png" width="240" alt="Cherrytwist Logo" /></a>
</p>
<p align="center"><i>Enabling society to collaborate. Building a better future, together.</i></p>

# Populate a Cherrytwist Ecoverse with data from a spreadsheet
This repository has functionality to enable the population of an Ecoverse with data from a spreadshet. The spreadsheet is a local file, in the "OpenDocument Spreadsheet" (ODS) format.

## Google Sheet Format

The spreadsheet does have a required format. An example of such a sheet is [provided in this repo](https://github.com/cherrytwist/populator/blob/develop/src/data/sample.ods). If you want to make a custom load of data into an Ecoverse then please make a copy of this sheet and fill as needed.

## Checks steps before starting:
* Ensure that the Cherrytwist Server is available, and that it (for now) has authentication disabled.

## Populating using custom locations or data file:
* Make a copy of `.env.default` to creat a `.env` file
* Edit this file to specify the values for the two environment variables:
    * CT_SERVER: The server file location (be sure to use just `/graphql` if you are running a setup without authentication)
    * CT_DATA_TEMPLATE: The data template to use for population
    * AUTH_ADMIN_EMAIL, AUTH_ADMIN_PASSWORD: for specifying the credentials to be used for accessing the server (if authentication is enabled)

## Execute the population
Finally you should now be in a position to run the data population!
* Execute `npm install` - to ensure the dependencies in the project are installed
* Execute `npm run populate`

Now you can navigate the web client and see a sample populated Ecoverse - enjoy!

## Updating
The data inside the template file will be iterating as you create the sample data to populate the ecoverse.

The populator provides the ability to separately create / update the information on the following entities:
* Organisation: execute `npm run populate-organisations`
* Ecoverse/Challenge/Opportunity: execute `npm run populate-context`

