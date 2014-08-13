# nuga

Have a dataset with no delimiters? Does it have defined column widths, though? Turn it into a usable CSV!

# Why?

I was processing [this dataset](http://www.hamiltontn.gov/assessor/AssessorFileDownload.aspx) and wanted a tool to easily reproduce the process for converting the data into a usable format.

# Installation

## Requirements

Requires [node](http://nodejs.org/).

## Install

```bash
npm install -g nuga
```

# Usage

## Define a column length spec for your dataset

Let's say you have a dataset with no delimiters. However, you do know where each column begins and ends.

An example dataset might be a two column dataset with columns `id` and `name`.

`id` is 10 characters long and starts at the 1st character in the line and the last character in the column is the 10th character in the line.

`name` is 100 characters long and starts and 11th character in the line and the last character in the column is the 110th character in the line.

So, our spec CSV would look like this:

```csv
field,starts,ends,length
id,1,10,10
name,11,110,100
```

Nuga is dependent on the `starts` and `ends` values being correct.


## Generate the CSV

With your dataset spec, run the `nuga` command. An example:

```bash
nuga -i mydataset.txt -o mydatasetasacsv.csv -s mydatasetlengthspec.csv
```

The `-i` argument is the dataset you want to convert to CSV.

The `-o` argument is the file you want the CSV to output to.

The `-s` argument is the location of your column length spec CSV.

In this example, if all went well, the generated CSV would be in the file `mydatasetasacsv.csv`.

# Todo

* Add support for looking at the order of the columns in the spec CSV and the `length` field in lieu of the `starts` and `ends` fields.
* Tests.

# License

This program is under the MIT License. See `LICENSE` for more details.
