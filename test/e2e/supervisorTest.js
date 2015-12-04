var expect = require('chai').expect;
var Supervisor = require('../../lib/supervisor');
var TweetCollector = require('tweet-collector');
var twitterCredentials = require('../fixtures/twitterCredentials')

describe('Tweet Collector Supervisor', function() {
  var supervisor;

  before(function(done) {
    supervisor = new Supervisor();

    for (var i = 0; i < 5; i++) {
      supervisor.addCollector(new TweetCollector(twitterCredentials, {
        search_params: {
          q: 'test'
        }
      }), Date.now());
    }

    done();
  });

  it('should start without errors', function(done) {
    supervisor.start();
    done();
  });

  it('should fetch some data', function(done) {
    supervisor.on('fetch', function(tweets, collectorId) {
      expect(tweets).to.be.array;
      expect(collectorId).to.be.not.null;
      done();
    });
  });

  after(function(done) {
    supervisor.stop();
    done();
  });
});