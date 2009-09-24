function(doc) {
  function emitMonthly(doc, user, start, end) {
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
      // start = start + 60 * 60 * 24;
    }
  }
  if (doc.type == "event" && doc.who && doc.who.forEach && doc.start && doc.end
    && typeof doc.start == "number" && typeof doc.end == "number") {
    doc.who.forEach(function(user) {
      emitMonthly(doc, user, doc.start, doc.end);
    });
    emitMonthly(doc, "", doc.start, doc.end);
  }
};