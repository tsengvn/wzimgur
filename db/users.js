var records = [
    { id: 1, username: 'test', token: '123456789', displayName: 'Test User', emails: [ { value: 'test@example.com' } ] }
  , { id: 2, username: 'wizeline', token: 'wize@123456', displayName: 'Wize Line', emails: [ { value: 'wizeline@example.com' } ] }
  , { id: 3, username: 'vucao', token: 'Fdy2jePw9R26lKFLBsVd', displayName: 'Vu Cao', emails: [ { value: 'wizeline@example.com' } ] }
];

exports.findByToken = function(token, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.token === token) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
