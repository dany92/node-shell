var command = require('./command');
process.stdout.write('prompt > ');

var done = function (output){
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
};

process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim();
  var args, cmd;
  var cmdList = cmdString.split(/\s*\|\s*/g);
  var args = parseArgs(cmdList);

  var temp = undefined;
  for(var i =0; i<args.length; i++){
    var func = matchCommands(args[i][0]);
    //console.log(done);
    //console.log(args[i].slice(1));
    temp = func(temp, args[i].slice(1), done);
    console.log(temp);

  }
  //if (cmdString.split(/\s*\|\s*/g).length > 1){
  //  args = cmdString.split(/\s*\|\s*/g).length;
  /*  cmd = args[0].split(' ')[0];
  } else {
    args = data.toString().trim().split(' ');
    cmd = args[0];
  }*/


});

function matchCommands(cmd){
  var functionToReturn;
  if(cmd === 'pwd'){
    functionToReturn = command.getPWD;
  } else if (cmd ==='date'){
    functionToReturn = command.getDate;
  } else if (cmd === 'ls'){
    functionToReturn = command.ls;
  } else if (cmd === 'cat'){
    functionToReturn = command.cat;
  } else if (cmd === 'head'){
    functionToReturn = command.head;
  } else if (cmd === 'tail'){
    functionToReturn = command.tail;
  } else if (cmd === 'curl'){
    functionToReturn = command.curl;
  }
  return functionToReturn;
}
function parseArgs(arg){
  var args = [];
  for(var i = 0; i<arg.length; i++){
    args[i] = arg[i].toString().trim().split(' ');
  }
  return args;
}
