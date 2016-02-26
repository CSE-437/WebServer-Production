Local Instructions (Adapted from AWS docs)

App will crash without a local version of dynammodb. You have to download
and extract the directory. I don't upload it to github.

To run Dynamodb locally use the command.
<pre>java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8989</pre>

Note: DynamoDB uses port 8989 by default.

A built-in JavaScript shell should open on http://localhost:8989/shell

#1. Creating A Table
Type the following code into the browsers Javascript shell

Note that you can have a partition key or you can have a partition and sort key. It doesn't really matter as long as you remember what is what.
```var params = {
    TableName : "Music",
    KeySchema: [       
        { AttributeName: "Artist", KeyType: "HASH" },  //Partition key
        { AttributeName: "SongTitle", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "Artist", AttributeType: "S" }, //Tells us the Artist is a string
        { AttributeName: "SongTitle", AttributeType: "S" }//Song title is a string
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function(err, data) { //creates the table
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

You will get this response

```{
          "TableDescription": {
                    "AttributeDefinitions": [
                              {
                                        "AttributeName": "Artist",
                                        "AttributeType": "S"
                              },
                              {
                                        "AttributeName": "SongTitle",
                                        "AttributeType": "S"
                              }
                    ],
                    "TableName": "Music",
                    "KeySchema": [
                              {
                                        "AttributeName": "Artist",
                                        "KeyType": "HASH"
                              },
                              {
                                        "AttributeName": "SongTitle",
                                        "KeyType": "RANGE"
                              }
                    ],
                    "TableStatus": "ACTIVE",
                    "CreationDateTime": "2016-02-17T06:22:48.364Z",
                    "ProvisionedThroughput": {
                              "LastIncreaseDateTime": "1970-01-01T00:00:00.000Z",
                              "LastDecreaseDateTime": "1970-01-01T00:00:00.000Z",
                              "NumberOfDecreasesToday": 0,
                              "ReadCapacityUnits": 1,
                              "WriteCapacityUnits": 1
                    },
                    "TableSizeBytes": 0,
                    "ItemCount": 0,
                    "TableArn": "arn:aws:dynamodb:ddblocal:000000000000:table/Music"
          }
}```

#2. Getting Info about a table
It's similar to any sql.

Here is the code to get the table Description
```var params = {
    TableName: "Music"
};

dynamodb.describeTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

Similarly for listing tables
```var params = {};

dynamodb.listTables(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

#3. Writing to the table

##Single Item
```var params = {
    TableName: "Music",
    Item: {
        "Artist":"No One You Know",//Partition key must include
        "SongTitle":"Call Me Today", //Sort key must include
        "AlbumTitle":"Somewhat Famous",
        "Year": 2015, //Notice how this wasn't included in the creation of the table
        "Price": 2.14,
        "Genre": "Country",
        "Tags": {
            "Composers": [
                  "Smith",
                  "Jones",
                  "Davis"
            ],
            "LengthInSeconds": 214
        }
    }
};
/*
Put item will overwrite normally.
*/
docClient.put(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

[http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html#DataModel.DataTypes](Shows more datatypes)

##Conditional Write

Modify params so it adds a conditional expression
```var params = {
    TableName: "Music",
    Item: {
        "Artist":"No One You Know",
        "SongTitle":"Call Me Today",
        "AlbumTitle":"Somewhat Famous",
        "Year": 2015,
        "Price": 2.14,
        "Genre": "Country",
        "Tags": {
            "Composers": [
                  "Smith",
                  "Jones",
                  "Davis"
            ],
            "LengthInSeconds": 214
        }
    },//Following line makes put check to see if there is a collisison
    "ConditionExpression": "attribute_not_exists(Artist) and attribute_not_exists(SongTitle)"
};
```

##Writing multiple items using **BatchWriteItem**

```
var params = {
    RequestItems: { //Say that we are making a request
        "Music": [//The table for this particular request. You can have manny
            {  
                PutRequest: {//You are making a put. Can use other types of request as well
                    Item: {
                        "Artist": "No One You Know",
                        "SongTitle": "My Dog Spot",
                        "AlbumTitle":"Hey Now",
                        "Price": 1.98,
                        "Genre": "Country",
                        "CriticRating": 8.4
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "Artist": "No One You Know",
                        "SongTitle": "Somewhere Down The Road",
                        "AlbumTitle":"Somewhat Famous",
                        "Genre": "Country",
                        "CriticRating": 8.4,
                        "Year": 1984
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "Artist": "The Acme Band",
                        "SongTitle": "Still In Love",
                        "AlbumTitle":"The Buck Starts Here",
                        "Price": 2.47,
                        "Genre": "Rock",
                        "PromotionInfo": {
                            "RadioStationsPlaying":[
                                "KHCR", "KBQX", "WTNR", "WJJH"
                            ],
                            "TourDates": {
                                "Seattle": "20150625",
                                "Cleveland": "20150630"
                            },
                            "Rotation": "Heavy"
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "Artist": "The Acme Band",
                        "SongTitle": "Look Out, World",
                        "AlbumTitle":"The Buck Starts Here",
                        "Price": 0.99,
                        "Genre": "Rock"
                    }
                }
            }
        ]
    }
};

//Write everything
docClient.batchWrite(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

#4. Reading an Item

Reading a single item uses the same params, but a different docClient method

```
var params = {
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    }
};
/*
Get not put
*/
docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

Reading a single field requires the **ProjectionExpression** attribute
```var params = {
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    },
    ProjectionExpression: "AlbumTitle"
};
```

But what about the case where you have multiple params? It be nice if you could use some variables. **ExpressionAttributesNames** solves this.
```var params = {
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    },
    ProjectionExpression: "AlbumTitle, #y",
    ExpressionAttributeNames: {"#y": "Year"} //#y is used at runtime.

};
```

But what about all of those nested attributes we wrote before?
```
var params = {
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    },
    ProjectionExpression: "AlbumTitle, #y, Tags.Composers[0], Tags.LengthInSeconds",
    ExpressionAttributeNames: {"#y": "Year"}
};
```


And of course, reading multiple attributes from multiple objects
```
var params = {
    RequestItems: {
        "Music": {
            Keys: [
                {
                    "Artist": "No One You Know",
                    "SongTitle": "My Dog Spot"
                },
                {
                    "Artist": "No One You Know",
                    "SongTitle": "Somewhere Down The Road"
                },
                {
                    "Artist": "The Acme Band",
                    "SongTitle": "Still In Love"
                },
                {
                    "Artist": "The Acme Band",
                    "SongTitle": "Look Out, World"
                }
            ],
            ProjectionExpression:"PromotionInfo, CriticRating, Price"
        }
    }
};
//Batch get not batchWrite
docClient.batchGet(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

#5 Querying (Here is where it stops being trivial)

##5.1 Running a Query

###Use a partition Key
```
var params = {
    TableName: "Music",
    KeyConditionExpression: "Artist = :artist",
    ExpressionAttributeValues: {
        ":artist": "No One You Know" //our old friend
    }
};

docClient.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

###Using Key Attributes
```
var params = {
    TableName: "Music",
    ProjectionExpression: "SongTitle",
    KeyConditionExpression: "Artist = :artist and begins_with(SongTitle, :letter)",
    ExpressionAttributeValues: {
        ":artist": "The Acme Band",
        ":letter": "S"
    }
};
```

##5.2 Filter Query Results

Modifying the previous param statement
```
var params = {
    TableName: "Music",
    ProjectionExpression: "SongTitle, PromotionInfo.Rotation",
    KeyConditionExpression: "Artist = :artist",
    #This line is new.
    FilterExpression: "size(PromotionInfo.RadioStationsPlaying) >= :howmany",
    ExpressionAttributeValues: {
        ":artist": "The Acme Band",
        ":howmany": 3
    },
};
```


##Fuck it, retrieve everything
```
var params = {
    TableName: "Music"
};

docClient.scan(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

#6. Using Secondary indexs.
Using Artist and SongTitle make it fast to search for songs with those
attributes, but what about searching for ones by Price?

Secondary keys allow you to search for items in tables without the
partition or sort keys

```
var params = {
    TableName: "Music", //We AREN'T creating a new table (technically)
    AttributeDefinitions:[
        {AttributeName: "Genre", AttributeType: "S"},
        {AttributeName: "Price", AttributeType: "N"}
    ], //Updates to include new secondary indexes
    GlobalSecondaryIndexUpdates: [
        {
            Create: { //Don't forget you can create update or delete indexes
                IndexName: "GenreAndPriceIndex",
                KeySchema: [
                    {AttributeName: "Genre", KeyType: "HASH"},  //Partition key
                    {AttributeName: "Price", KeyType: "RANGE"},  //Sort key
                ],
                Projection: {
                    "ProjectionType": "ALL"
                },
                //This is required, but the local version of DynamoDB ignores
                ProvisionedThroughput: {
                    "ReadCapacityUnits": 1,"WriteCapacityUnits": 1
                }
            }
        }
    ]
};
//Update table
dynamodb.updateTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

```

Query and scan like before

#7. Modify Items in a table
##7.1 Update
You can do a couple things with UpdateItem
- Add more attributes to an item.
- Modify the values of one or more attributes in the Items
- Remove attributes from the item.

Use the *Update Expression* to pick the operation.

By default, Update Item does not return data, you must specify.
- ALL_OLD returns all attribute values as they appeared before the update.
- UPDATED_OLD returns only the updated attributes as they appeared before the update.
- ALL_NEW returns all attribute values as they appear after the update.
- UPDATED_NEW returns only the updated attributes as they appeared after the update.

Here's the code
```
var params = {
    TableName: "Music",
    Key: {
        "Artist":"No One You Know",
        "SongTitle":"Call Me Today"
    },
    UpdateExpression: "SET RecordLabel = :label",
    ExpressionAttributeValues: {
        ":label": "Global Records"
    },
    ReturnValues: "ALL_NEW"
};

docClient.update(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

But what if you only want to update conditionally.
```
var params = {
    TableName: "Music",
    Key: {
        "Artist":"No One You Know",
        "SongTitle":"Call Me Today"
    },
    UpdateExpression: "SET RecordLabel = :label",
    ExpressionAttributeValues: {
        ":label": "New Wave Recordings, Inc."
    },
    //Our old friend. The ConditionalExpression
    ConditionExpression: "attribute_not_exists(RecordLabel)",
    ReturnValues: "ALL_NEW"
};
```

#SPECIFYING ATOMIC COUNTERS
It's in bold be cause this is how you ensure transactions in dynamo


```
var params = {
    TableName: "Music",
    Key: {
        "Artist":"No One You Know",
        "SongTitle":"Call Me Today"
    },
    UpdateExpression: "SET Plays = Plays + :incr",
    ExpressionAttributeValues: {
        //This increments by 1 atomically
        ":incr": 1
    },
    ReturnValues: "UPDATED_NEW"
};
```

#7.2 Deleting an Item

**DeleteItem** API
```
var params = {
    TableName: "Music",
    Key: {
        Artist: "The Acme Band",
        SongTitle: "Look Out, World"
    }
};

docClient.delete(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
```

Guess how conditional deletions are done?
```
var params = {
    TableName: "Music",
    Key: {
        Artist: "No One You Know",
        SongTitle: "My Dog Spot"
    },
    ConditionExpression: "Price = :price",
    ExpressionAttributeValues: {
        ":price": 0.00
    }
};
```
