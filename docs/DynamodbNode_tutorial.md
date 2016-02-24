#1. Creating a Table.

In a javascript file, not the interpreter paste this code.
It creates a table for movies with the year being the partition key and the
title being the sort key. *You get movies based on the year they were made.*

```
var AWS = require("aws-sdk"); // ES6 import {{AWS}} from 'aws-sdk'//Don't forget to run npm install --save aws-sdk before hand

//shouldn't change in production code
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    //You will crash without this line.
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
//#That was easy
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
```

#2. Lets get some sample data in there
[http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/samples/moviedata.zip](Download the movie data and extract the json file)

Here's an example of the data
```{
    "year" : 2013,
    "title" : "Turn Down for What!",
    "info" : {
        "directors" : [
            "Alice Wang",
            "ZayZay"
        ],
        "release_date" : "2013-01-18T00:00:00Z",
        "rating" : 6.2,
        "genres" : [
            "Comedy",
            "Drama"
        ],
        "image_url" : "http://ia.media-imdb.com/images/N/O9ERWAU7FS797AJ7LU8HN09AMUP908RLlo5JF90EWR7LJKQ7@@._V1_SX400_.jpg",
        "plot" : "A rock band plays their music at high volumes, annoying the neighbors.",
        "rank" : 11,
        "running_time_secs" : 5215,
        "actors" : [
            "David Matthewman",
            "Ann Thomas",
            "Jonathan G. Neff"
       ]
    }
}
```

In a separate file from the one running the server, create a Dynammo client, and load the data
```
import {AWS} from 'aws-sdk';
import {fs} from 'fs';

AWS.config.update({
region: "us-west-2",
endpoint: "http://localhost:8000"
  });

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Wait.");
//in real life you would do this asynchrounosly using the async and await keywords.
var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
allMovies.forEach(function(movie){
  var params = {
    TableName: "Movies",
    Item: {
      "year": movie.year,
      "title": movie.title,
      "info":movie.info
      }
  };
  //If you are sad that we aren't using batchWrite, then we are on the same page.
  docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", movie.title);
       }
    });
  });
  ```


Once it's in the database we can do whatever
