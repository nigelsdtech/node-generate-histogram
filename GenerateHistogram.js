/*
 * Generate a histogram from data files
 */

var
    csvReader = require('csv-reader'),
    fs        = require('fs'),
    histogram = require('ascii-histogram');


/**
 * Generates a histogram from the data provided
 *
 * E.g. you have a csv file with this data:
 *
 * cats,1
 * dogs,5
 * cows,10
 * rats,200
 *
 * @param {object} params - params to be passed in to the function
 * @param {string} params.file - path to the file containing the data
 */
function generateSimpleHistogram(params) {

  var histData = {};

  var inputStream = fs.createReadStream(params.file, {encoding: 'utf8'});

  inputStream
    .pipe(csvReader({
      parseBooleans: true,
      parseNumbers: true,
      trim: true
    }))
    .on('data', function (row) {
        histData[row[0]] = row[1]
    })
    .on('error', function (error) {
      throw e
    })
    .on('end', function (data) {
      console.log(histogram(histData));
    });

}

/**
 * Generates a chart showing time difference between two time columns
 *
 * E.g. you have a csv file with this data:
 *
 * 2016-01-01 00:00:00,2016-01-01 00:00:59
 * 2016-01-01 10:01:00,2016-01-01 10:04:00
 * 2016-01-01 20:00:00,2016-01-01 22:00:00
 *
 * It will display the start time (column 1) followed by the amount of time (in seconds) taken to get to the end. Eg:
 *
 * 2016-01-01 00:00:00 (59)
 * 2016-01-01 10:00:00 (180)
 * 2016-01-01 20:00:00 (3600)
 *
 *
 * @param {object} params - params to be passed in to the function
 * @param {string} params.file - path to the file containing the data
 */
function generateLagChart(params) {

  var histData = {};

  var inputStream = fs.createReadStream(params.file, {encoding: 'utf8'});

  inputStream
    .pipe(csvReader({
      trim: true
    }))
    .on('data', function (row) {

      var start = row[0]
      var end   = row[1]

      var s = new Date(start)
      var e = new Date(end)

      var lag = (e.getTime() - s.getTime())/1000;

      histData[start] = lag

    })
    .on('error', function (error) {
      throw e
    })
    .on('end', function (data) {
      console.log(histogram(histData));
    });

}


// Get the data file
var file = process.env.DATA_FILE;


// Get the type of chart you want to display
switch (process.env.CHART_TYPE) {
  case 'simple':
  default :
    generateSimpleHistogram({file: file});
    break;
  case 'lag':
    generateLagChart({file: file});
    break;
}
