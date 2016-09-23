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

  var histJson = [];

  var inputStream = fs.createReadStream(params.file, {encoding: 'utf8'});

  inputStream
    .pipe(csvReader({
      parseBooleans: true,
      parseNumbers: true,
      trim: true
    }))
    .on('data', function (row) {
        histJson[row[0]] = row[1]
    })
    .on('error', function (error) {
      throw e
    })
    .on('end', function (data) {
      console.log(histogram(histJson));
    });

}

/**
 * Generates a chart showing time difference between two time columns
 *
 * E.g. you have a csv file with thisdata:
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
function generateLagChart() {

  readJSON('data/lag.json', function (err, jdata) {
 
    if (err) throw err

    var histData = {}

    // Calculate lag for each element in the array
    jdata.forEach( function (el, idx) {

      var p = new Date('2016-01-01 '+el.processedAt)
      var t = new Date('2016-01-01 '+el.triggeredAt)

      var lag = (p.getTime() - t.getTime())/1000;

      histData[el.processedAt] = lag
    })

    console.log(histogram(histData));
    
  })

 
}


generateSimpleHistogram({file: process.env.DATA_FILE} )
