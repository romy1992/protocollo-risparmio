const fetch = require("node-fetch");
const functions = require("firebase-functions");
exports.proxyApiRequest = functions.https.onRequest(async (req, res) => {
  const apiUrl = "http://protocollo-risparmio.eu-south-1.elasticbeanstalk.com/api" + req.url;
  const response = await fetch(apiUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" ? undefined : req.body,
  });
  const data = await response.text();
  res.status(response.status).send(data);
});
