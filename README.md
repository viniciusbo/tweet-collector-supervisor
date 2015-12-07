# Tweet Collector Supervisor

Easier handler for multiple Tweet Collector instances.

```javascript
var Supervisor = require('tweet-collector-supervisor');
var supervisor = new Supervisor();

var TweetCollector = require('tweet-collector');
var collectorOne = new TweetCollector({ ... });
var collectorTwo = new TweetCollector({ ... });
var collectorThree = new TweetCollector({ ... });

supervisor.addCollector(collectorOne, 0);
supervisor.addCollector(collectorTwo, 'one');
supervisor.addCollector(collectorThree, 2);

supervisor.start();
supervisor.on('fetch', function onFetch(collectorId, tweets) {
  console.log(collectorId);
  console.log(tweets);
});
supervisor.stop();
```

## API

### `supervisor.addCollector(tweetCollector, collectorId)`

Supervise a collector.

- **tweetCollector**: an instance of TweetCollector
- **collectorId**: collector identification; you can keep track from which collector tweets were fetched

### `supervisor.start()`

Starts collectors.

### `supervisor.stop()`

Stops collectors.