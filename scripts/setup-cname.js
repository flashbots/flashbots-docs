require('dotenv').config()

var fs = require('fs');

console.log(process.env.TARGET_URL === "https://docs.flashbots.net/")
fs.writeFile('./static/CNAME', process.env.TARGET_URL, function (err) {
  if (err) throw err;
  console.log('CNAME created for ', process.env.TARGET_URL);
}); 
