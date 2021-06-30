<p align="center">
  <a href="http://alkem.io/" target="blank"><img src="https://alkem.io/uploads/logos/alkemio-logo.svg" width="400" alt="Alkemio Logo" /></a>
</p>
<p align="center"><i>Enabling society to collaborate. Building a better future, together.</i></p>

# Populate a Alkemio Ecoverse with data from a spreadsheet
This repository has functionality to enable the population of an Ecoverse with data from a spreadshet. The spreadsheet is a local file, in the "OpenDocument Spreadsheet" (ODS) format.

## Spreadsheet Format

The spreadsheet does have a required format. An example of such a sheet is [provided in this repo](https://github.com/alkem-io/populator/blob/develop/alkemio-sdgs.ods). If you want to make a custom load of data into an Ecoverse then please make a copy of this sheet and fill as needed.

## Checks steps before starting:
* Ensure that the Alkemio Server is available, and that it (for now) has authentication disabled.

## Populating using custom locations or data file:
* Make a copy of `.env.default` to creat a `.env` file
* Edit this file to specify the values for the two environment variables:
    * CT_SERVER: The server file location. Note: the URL format to use depends on whether authentication is enabled or not. If not enabled then just use `/graphql`, if it is enabled then use `admin/graphql` after the server / port.
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

