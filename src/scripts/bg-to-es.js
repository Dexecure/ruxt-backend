const AWS = require("aws-sdk");
const BigQuery = require("@google-cloud/bigquery");

const { ESHost, datasetName } = require("./env.js");

const esOptions = {
  hosts: [ESHost],
  connectionClass: require("http-aws-es"),
  awsConfig: new AWS.Config({ region: "us-east-1" }), // set an aws config e.g. for multiple clients to different regions
  httpOptions: {}, // set httpOptions on aws-sdk's request. default to aws-sdk's config.httpOptions
  requestTimeout: "2000000"
};
const client = require("elasticsearch").Client(esOptions);

const items = [];

// Creates a client
const bigquery = new BigQuery({
  projectId
});

const sqlQuery = `
SELECT
  DISTINCT origin
FROM
  \`${datasetName}\`
where LENGTH(origin) < 10
`; // length used as a crude way of splitting the query, mod(length) would be better

const options = {
  query: sqlQuery,
  useLegacySql: false // Use standard SQL syntax for queries.
};

async function printResult(rows) {
  // [START bigquery_simple_app_print]
  console.log("Query Results:");
  rows.forEach(function(row) {
    let origin = row["origin"];
    items.push(
      { index: { _index: "origin-index", _type: "all", _id: origin } },
      { origin }
    );
    //console.log('adding ' + origin);
  });
  console.log(items.length);
  console.log("calling elastic");
  // [END bigquery_simple_app_print]
  for (let i = 0; i < items.length; i = i + 40) {
    console.log("adding from to", i, i + 40);
    try {
      const response = await client.bulk({
        body: items.slice(i, i + 40)
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}

(async () => {
  try {
    const results = await bigquery.query(options);
    await printResult(results[0]);
  } catch (err) {
    console.error("ERROR:", err);
  }
})();
