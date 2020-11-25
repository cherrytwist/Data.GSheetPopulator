# Populate an Ecoverse with data from a Google Sheet
This repository has functionality to enable the population of an Ecoverse with data from a Google Sheet.

## Google Sheet Format

The google sheet does have a required format. An example of such a sheet is [publicly available](https://docs.google.com/spreadsheets/d/1pXofg_2KauXSDmA2iDqZJipblJUfpMXC_N5KtruZqwM/). If you want to make a custom load of data into an Ecoverse then please make a copy of this sheet and fill as needed.

## Checks steps before starting:
* Ensure that the Cherrytwist Server is available, and that it (for now) has authentication disabled. 
    * If you have moved it from the default location then you can make a copy of `.env.default` to creat a `.env` file and specify the location there.
* Ensure that you are able to access the gsheet being used - for example the [publicly available ghsset](https://docs.google.com/spreadsheets/d/1pXofg_2KauXSDmA2iDqZJipblJUfpMXC_N5KtruZqwM/).

## Google API authenticaiton
The next step is to be able to authenticate via an api to the Google Sheet. 

The instructions to do this are specified in the following article: [https://developers.google.com/sheets/api/quickstart/nodejs](https://developers.google.com/sheets/api/quickstart/nodejs). Key steps are:
* Select the application type 'desktop'
* Save the created file into the "secrets" folder with the default name i.e. `credentials.json`
* Run a script to access the google api. The first time you will be prompted to verify your identity. This gives a warning which can be ignored. Please follow the instructions. All going well you should have a second file called `token.json` that is then to be stored inside the `secrets` folder. The script will abort with an error this one time - that is ok.
* Please verify that you now have two files inside your `secrets` folder: `credentials.json` and `token.json`.

## Execute the population
Finally you should now be in a position to run the data population!
* Execute `npm run sample-data`
* Execute `npm run populate-avatars`

Now you can navigate the web client and see a sample populated Ecoverse - enjoy!

