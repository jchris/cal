function(doc) {
  function emitUsers(users) {
    if (users && users.forEach) {
      users.forEach(function(user) {
        emit(user, 1);
      });
    }
  }
  if (doc.type == "event") {
        emitUsers(doc.attendees);
        emitUsers(doc.hosts);
  }
  if (doc.type == "profile") {
        emitUsers(doc, doc.attendees, doc.start && doc.end);
  }
};