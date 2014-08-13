var fs = require("fs")
  , es = require("event-stream")
  ,  Q = require("q")
  ,  _ = require("lodash")
  , Stream = require('stream')
  , parse = require('csv-parse')
  , stringify = require("csv-stringify");

function header(spec) {
  return _.map(spec, function(s) { return s.field;}).join(',') + "\n";
}

function headerStream(spec) {
  var h = new Stream.Readable();
  h.push(header(spec));
  h.push(null);

  return h;
}

function transformRow(line, spec){
  return _.map(spec, function(s) {
    var sub = line.substring(s.starts - 1, s.ends);
    if (_.isString(sub)) {
      return sub.trim();
    } else {
      return sub;
    }
  });
}

function readSpec(spec){
  var deferred = Q.defer()
  ,  parser = parse({columns: true}, function(error, data){
       if (error) {
         deferred.reject(new Error(error));
       } else {
         deferred.resolve(data);
       }
     });

  fs.createReadStream(spec).pipe(parser);

  return deferred.promise;

}

function write(input, output, spec) {
  readSpec(spec).then(function (s) {
    es.merge(
      headerStream(s),
      fs.createReadStream(input, {flags: 'r'})
        .pipe(es.split())
        .pipe(es.map(function (line, cb) {
          cb(null, transformRow(line, s))
        }))
        .pipe(stringify()))
    .pipe(fs.createWriteStream(output));
  });
}

exports.write = write
