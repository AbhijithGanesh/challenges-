const ExpressCassandra = require("express-cassandra");

let models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["127.0.0.1"],
    localDataCenter: "week-1-datacenter",
    protocolOptions: { port: 9042 },
    keyspace: "cassandra",
    queryOptions: { consistency: ExpressCassandra.consistencies.one },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: "SimpleStrategy",
      replication_factor: 1,
    },
    migration: "safe",
  },
});

let Artist = models.loadSchema("Artist", {
  fields: {
    name: { type: "text", default: "Artist name not in records" },
    age: { type: "int", default: 0 },
    album: "varchar",
    created: "timestamp",
  },
  key: ["album"],
});

Artist.syncDB(function (err, result) {
  if (err) throw err;
});

let instance = new models.instance.Artist({
  name: "Dua Lipa",
  age: 26,
  album:"Now Dance Spring 2017",
  created: Date("15 October 2007"),
});


instance.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Saved an instance of the Artist Model!");
});

