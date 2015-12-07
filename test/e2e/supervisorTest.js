var expect = require('chai').expect;
var Supervisor = require('../../lib/supervisor');
var TweetCollector = require('tweet-collector');
var twitterCredentials = require('../fixtures/twitterCredentials')

describe('Tweet Collector Supervisor', function() {
  var supervisor, collectorId = Date.now();

  before(function(done) {
    supervisor = new Supervisor();

    for (var i = 0; i < 5; i++) {
      supervisor.addCollector(new TweetCollector(twitterCredentials, {
        search_params: {
          q: 'test'
        }
      }), collectorId);
    }

    done();
  });

  it('should start without errors', function(done) {
    supervisor.start();
    done();
  });

  it('should fetch some data', function(done) {
    supervisor.on('fetch', function(id, tweets) {
      expect(tweets).to.be.array;
      expect(id).to.be.eql(collectorId);
      done();
    });
  });

  after(function(done) {
    supervisor.stop();
    done();
  });
});