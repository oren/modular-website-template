module.exports = indexPage;

function indexPage (req, res) {
  var locals = {title: 'Cleaning on the go'};

  res.template("index.ejs", locals);
};
