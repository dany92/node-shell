var fs = require('fs');
var request = require('request');

var commands = {
  getPWD: function (stdin, args, done){
      done(process.cwd());
  },

  ls : function (stdin, args, done){
    fs.readdir (process.cwd(), function (err, files) {
    if (err) throw err;
    var stringOutput = '';
      files.forEach (function (file) {
        stringOutput += file.toString() + '\n';
      });
      done(stringOutput);
    });

  },

  getDate: function (stdin, args, done){
    done(new Date().toString());
  },

  cat: function (stdin, args, done){
    fs.readFile(args[0], (err,data) =>{
        if(err) throw err;
        done(data.toString());
    });
  },

  head: function (stdin, args, done){
    fs.readFile(args[0], (err,data) =>{
        if(err) throw err;
        var sentences = data.toString().split('\n');
        done(sentences.slice(0,11).join('\n'));
    });
  },

  tail: function (stdin, args, done){
    fs.readFile(args[0], (err,data) =>{
        if(err) throw err;
        var sentences = data.toString().split('\n');
        done(sentences.slice(sentences.length -10).join('\n'));
    });
  },

  curl: function (stdin, args, done){
    request(args[0], function (error, response, body){
      if (error){
        console.error('error');
      } else {
        done(body.toString());
      }
    });
  }
};



module.exports = commands;
