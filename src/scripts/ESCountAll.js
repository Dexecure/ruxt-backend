const AWS = require("aws-sdk");
const env = require("./env.js");
const options = {
  hosts: [env.ESHost],
  connectionClass: require("http-aws-es"),
  awsConfig: new AWS.Config({ region: "us-east-1" }), // set an aws config e.g. for multiple clients to different regionsZ
  httpOptions: {} // set httpOptions on aws-sdk's request. default to aws-sdk's config.httpOptions
};
const client = require("elasticsearch").Client(options);

client.count({ index: "origin-index" }, function(error, response) {
  if (error) {
    console.log(error);
    return;
  }
  const count = response.count;
  console.log(count);
});
