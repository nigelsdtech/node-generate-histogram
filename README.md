# node-generate-histogram
Pass in a csv file with histogram data and this will generate an ascii-histogram

## Version
1.0.2


## Installation

```sh
$ npm install generate-histogram
```


## Usage

There are two functions,
* Generate a basic histogram
* Calculate lag (time difference) between two time columns and show a chart of that lag


You need to set the following environment variables:

**DATA_FILE** - Path to the csv file containing the data

**CHART_TYPE** - Either "simple" for a basic histogram or "lag" for a lag chart.

```sh
$ export DATA_FILE="PATH_TO_YOUR_FILE"
$ export CHART_TYPE="simple"
$ npm start

```




### Generating a simple chart

Create a csv file with two columns; the variable and the frequency.

```
bananas,6
apples,1
oranges,24
figs,4
```

Then run as follows:
```sh
$ export DATA_FILE='basicSample.csv'; export CHART_TYPE='simple'; npm start

  bananas | ###############                                              | 6
   apples | ###                                                          | 1
  oranges | ############################################################ | 24
     figs | ##########                                                   | 4
```



### Generating a lag chart

Create a csv file with two columns; the start time and end time (it needs to be in YYYY-mm-dd HH:MM:SS format):

```
2016-01-01 17:57:20,2016-01-01 17:57:32
2016-01-01 17:57:21,2016-01-01 17:57:32
2016-01-01 17:57:21,2016-01-01 17:57:37
2016-01-01 17:57:22,2016-01-01 17:57:37
2016-01-01 17:57:23,2016-01-01 17:57:37
2016-01-01 17:57:24,2016-01-01 17:57:37
2016-01-01 17:57:25,2016-01-01 17:57:37
2016-01-01 17:57:26,2016-01-01 17:57:37
2016-01-01 17:57:26,2016-01-01 17:57:40
```

Then run as follows:
```sh
$ export DATA_FILE='lagSample.csv'; export CHART_TYPE='lag'; npm start

  2016-01-01 17:57:20 | #############################################                | 12
  2016-01-01 17:57:21 | ############################################################ | 16
  2016-01-01 17:57:22 | ########################################################     | 15
  2016-01-01 17:57:23 | #####################################################        | 14
  2016-01-01 17:57:24 | #################################################            | 13
  2016-01-01 17:57:25 | #############################################                | 12
  2016-01-01 17:57:26 | #####################################################        | 14

```




### Examples

See examples/basicHistogram.sh and examples/lagHistogram.sh to get started. You can run it with the following.

```sh
user@machine:~/useful/node-generate-histogram (master u=)$ cd examples/
user@machine:~/useful/node-generate-histogram/examples (master u=)$ sh basicHistogram.sh
  17:00:00 | ###                                                          | 15
  17:00:01 | #                                                            | 5
  17:00:02 | #################                                            | 83
  17:00:03 | ############################################################ | 288
  17:00:04 | #####                                                        | 23
  17:00:06 | ####################                                         | 96
  17:00:07 | ###                                                          | 14
  17:00:08 | ###                                                          | 14
  17:00:09 | ######                                                       | 29

user@machine:~/useful/node-generate-histogram/examples (master u=)$
```
