# Populate an Ecoverse with data from a spreadsheet
This repository has functionality to enable the population of an Ecoverse with data from a spreadshet. The spreadsheet is a local file, in the "OpenDocument Spreadsheet" (ODS) format.

## Google Sheet Format

The spreadsheet does have a required format. An example of such a sheet is [provided in this repo](https://github.com/cherrytwist/populator/blob/develop/src/data/sample.ods). If you want to make a custom load of data into an Ecoverse then please make a copy of this sheet and fill as needed.

## Checks steps before starting:
* Ensure that the Cherrytwist Server is available, and that it (for now) has authentication disabled.

## Populating using custom locations or data file:
* Make a copy of `.env.default` to creat a `.env` file
* Edit this file to specify the values for the two environment variables:
    * CT_SERVER: The server file location
    * CT_DATA_TEMPLATE: The data template to use for population
    * CT_ACCESS_TOKEN: for passing in an access token. The client-lib package then passes this as part of the Bearer http header.
## Execute the population
Finally you should now be in a position to run the data population!
* Execute `npm run populate`

Now you can navigate the web client and see a sample populated Ecoverse - enjoy!

## Updating
The data inside the template file will be iterating as you create the sample data to populate the ecoverse.

The populator provides the ability to separately create / update the information on the following entities:
* Organisation: execute `npm run populate-organisations`
* Ecoverse/Challenge/Opportunity: execute `npm run populate-context`

