const AWS = require('aws-sdk');
const FORM = require('./writeform');
const express=require('express');
const router=express.Router();
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId:"", secretAccessKey:""
});
let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/',(req,res)=>{
  FORM.QuanLySanPham(res);
  let params = {
    TableName: "SanPhams"
  };
  let scanObject = {};
  docClient.scan(params, (err, data) => {
    if (err) {
      scanObject.err = err;
    } else {
      scanObject.data = data;
    }
    FORM.writeItemTable(scanObject, res);
  });
});

router.get('/delete',(req,res)=>{
  var Ma=req.query.MaSP;
  var Ten= req.query.TenSP;
  let params = {
    TableName: 'SanPhams',
    Key:{
      "MaSP": String(Ma),
      "TenSP": String(Ten)
    }
  };

  docClient.delete(params, (err, data) => {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      res.redirect('/');
    }
    res.end();
  });
});
module.exports=router;