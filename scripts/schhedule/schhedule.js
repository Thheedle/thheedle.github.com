// region requires
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const utilities = require('./utilities.js');
const config = require('./config.json');

// endregion



// region API
const approvedFiles = {
  uri: '',
  headers: {
    'User-Agent': 'request-promise-native',
  },
};
// endregion
const app = express();

// region pre-processing
app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// endregion


app.get('/getclassfinderfrontpage', (req, res, next) => {
  utilities.fetchClassFinderFrontPage(config.classfinderURL).then((data) => {
    const parsedFrontPage = utilities.classFinderFrontPageParser(data);
    utilities.updateAllTerms(parsedFrontPage);
    res.send(parsedFrontPage);
  }).catch((err) => {
    next(err);
  });
});


app.get('/queryclassfinder', (req, res, next) => {
  let subject1;
  if (!req.query.subject1){
    subject1 = 'dummy';
  }
  // use if here
  let subject2 = req.query.subject2 ||'dummy';
  let gur1 = 'dummy';
  let gur2 = 'dummy';
  let day = 'dummy';
  let open = 'dummy';
  let crn = '';
  let term = 201840;
  let gur3 = 'ALL';
  let subject3 = 'ALL';
  let instructor = 'ANY';
  let course = '';
  let beginHour = '0';
  let beginMinute = 'A';
  let endHour = '0';
  let endMinute = 'A';
  let credits = '%';
  const api = `sel_subj=${subject1}&sel_subj=${subject2}&sel_gur=${gur1}&sel_gur=${gur2}&sel_day=${day}&sel_open=${open}&sel_crn=${crn}&term=${term}&sel_gur=${gur3}&sel_subj=${subject3}&sel_inst=${instructor}&sel_crse=${course}&begin_hh=${beginHour}&begin_mi=${beginMinute}&end_hh=${endHour}&end_mi=${endMinute}&sel_cdts=${credits}`;
  res.send('ok');
});

// default error handling middleware
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send(err.message);
  }
  next();
});

const server = app.listen(config.server.port, () => {
  console.log(`Listening on port ${config.server.port}`);
});


/**
 * graceful shutdown on detection of error to the starcache server
 * @param msg
 */
function gracefulShutdown(msg) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected, ${msg}`);
  });
  server.close(() => {
    console.log('Express closed.');
  });
  process.exit(0);
}

/**
 * gracefully close connection on SIGINT and not wait for system to clear them
 */
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Express closed.');
    // none forcefully try to shutdown mongoose
    mongoose.connection.close(false, () => {
      console.log('MongoDb default connection closed.');
      process.exit(0);
    });
  });
});

/**
 * gracefully close connection on SIGHUP and not wait for system to clear them
 */
process.on('SIGHUP', () => {
  server.close(() => {
    console.log('Express closed.');
    // none forcefully try to shutdown mongoose
    mongoose.connection.close(false, () => {
      console.log('MongoDb default connection closed.');
      process.exit(0);
    });
  });
});