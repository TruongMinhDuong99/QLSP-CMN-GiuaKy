var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId:"", secretAccessKey:""
  });

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allStudents = JSON.parse(fs.readFileSync('DuLieu.json', 'utf8'));
allStudents.forEach(function(sp) {
    var params = {
        TableName: "SanPhams",
        Item: {
            "MaSP":sp.MaSP,
            "TenSP":sp.TenSP, 
            "SoLuong":sp.SoLuong,
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add users", sp.TenSP, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", sp.TenSP);
       }
    });
});