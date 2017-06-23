var records = [
    { id: 1, username: 'test', token: '123456789', displayName: 'Test User', email: 'test@example.com', 'expires_in' : 3600 }
  , { id: 2, username: 'wizeline', token: 'wize@123', displayName: 'Wize Line', email: 'test@example.com', 'expires_in' : 3600}
  , { id: 3, username: 'vucao', token: 'Fdy2jePw9R26lKFLBsVd', displayName: 'Vu Cao', email: 'test@example.com', 'expires_in' : 3600}
  , { id: 4, username: 'thanhpham', token: 'Tt2ifobRKh7', displayName: 'Thanh Pham', email: 'test@example.com', 'expires_in' : 3600 }
  , { id: 5, username: 'thaile', token: 'k77VhdrFqkE', displayName: 'Thai Le', email: 'test@example.com', 'expires_in' : 3600 }
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
