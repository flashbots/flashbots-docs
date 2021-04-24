require('dotenv').config()

var fs = require('fs');

console.log(process.env.CURRENT_BRANCH)
console.log(process.env.DEPLOYMENT_BRANCH)
console.log(process.env.TESTING)

fs.writeFile('./static/CNAME', process.env.TARGET_URL, function (err) {
  if (err) throw err;
  console.log('CNAME created for ', process.env.TARGET_URL);
}); 