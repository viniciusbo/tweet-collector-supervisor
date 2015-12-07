var EventEmitter = require('events');
var util = require('util');

function Supervisor() {
  this.collectors = {};
};

util.inherits(Supervisor, EventEmitter);

Supervisor.prototype.start = function(settings) {
  console.log('Starting collector supervisor...');
  startCollectors(this.collectors);
};

function startCollectors(collectors) {
  for (id in collectors)
    collectors[id].start()
}

Supervisor.prototype.addCollector = function(tweetCollector, collectorId) {
  if (!collectorId)
    throw new Error('Missing collector ID parameter');

  tweetCollector.on('fetch', onCollectorFetch.bind(this, collectorId))
  this.collectors[collectorId] = tweetCollector;
  console.log('Supervising new collector');
};

function onCollectorFetch(collectorId, tweets) {
  if (tweets.length == 0)
    return;

  console.log('Collector fetched some data');
  this.emit('fetch', collectorId, tweets);
}

Supervisor.prototype.resumeCollector = function(collectorId) {
  var collector = this.collectors[collectorId];
  if (!collector || collector.status == 'started')
    return;

  collector.start();
};

Supervisor.prototype.stopCollector = function(collectorId) {
  var collector = this.collectors[collectorId];
  if (collector)
    collector.stop();
};

Supervisor.prototype.removeCollector = function(collectorId) {
  this.stopCollector(collectorId);
  delete this.collectors[collectorId];
};

Supervisor.prototype.stop = function() {
  for (id in this.collectors)
    this.collectors[id].stop();
};

module.exports = Supervisor;