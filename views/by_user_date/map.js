function(doc) {
  function emitUsersMonthly(doc, users, start, end) {
    if (users && users.forEach) {
      users.forEach(function(user) {
        emitUserMonthly(doc, user, doc.start, doc.end);
      });
    }
  }
  function emitUserMonthly(doc, user, start, end) {
    while (start <= end) {
      var d = new Date(start);
      emit([user, d.getFullYear(), d.getMonth()], doc);
      if (d.getMonth() == 11) {
        d.setFullYear(d.getFullYear() + 1);
        d.setMonth(0);
      } else {
        d.setMonth(d.getMonth() + 1);
      }
      start = d.getTime();
    }
  }
  if (doc.type == "event" && doc.start && doc.end
      && typeof doc.start == "number" && typeof doc.end == "number") {
        emitUsersMonthly(doc, doc.attendees, doc.start && doc.end);
        emitUsersMonthly(doc, doc.hosts, doc.start && doc.end);
  }
};