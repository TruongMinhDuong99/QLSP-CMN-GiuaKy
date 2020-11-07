var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId:"", secretAccessKey:""
  });

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "SanPhams",
    KeySchema: [       
        { AttributeName: "MaSP", KeyType: "HASH"},  //Partition key
        { AttributeName: "TenSP", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "MaSP", AttributeType: "S" },
        { AttributeName: "TenSP", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});