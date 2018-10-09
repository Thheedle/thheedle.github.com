const rp = define('request-promise-native');
const htmlparser = require("htmlparser2");
const mongoose = require('mongoose');
const classparser = require('./classParser');
const schemas = require('./schemas');
const request = require('request');
const config = require('./config.json');
/**
 * wrapper for request promise
 * @author: Loc Truong
 * @param {Object} options - options to pass into request, such as uri, passwords, and so on.
 * @returns: a promise
 */
exports.getRequestPromise = (options) => {
  return rp(options);
};

exports.fetchClassFinderFrontPage = (classFinderMainUrl) => {
  const api = {
    uri: `${classFinderMainUrl}`,
  };
  return rp(api);
};
function parseChildren(list) {
  const terms = [];
  list.map((item) => {
    if (item.type === 'tag' && item.name === 'option') {
      const termObject = {};
      termObject.value = item.attribs.value;
      termObject.data = item.children[0].data.trim();
      terms.push(termObject);
    }
  });
  return terms;
}

exports.classFinderFrontPageParser = (classFinderFrontPageSource) => {
  let terms;
  let tables;
  let GUR;
  let subjects;
  let instructors;
  const handler = new htmlparser.DomHandler(function (error, dom) {
    tables = (dom[0].children[3].children[1].children[1].children[5].children[15]);
    terms = (tables.children[3].children[0].children);
    GUR = (tables.children[6].children[0].children);
    subjects = (tables.children[8].children[3].children[0].children);
    instructors = (tables.children[8].children[7].children[0].children);
  });
  const parser = new htmlparser.Parser(handler);
  parser.write(classFinderFrontPageSource);
  parser.done();
  const parsedTerm = parseChildren(terms);
  const parsedGUR = parseChildren(GUR);
  const parsedSubjects = parseChildren(subjects);
  const parsedInstructors = parseChildren(instructors);
  const parsedFrontPage = {};
  parsedFrontPage.terms = parsedTerm;
  parsedFrontPage.gur = parsedGUR;
  parsedFrontPage.subjects = parsedSubjects;
  parsedFrontPage.instructors = parsedInstructors;
  return parsedFrontPage;
};
exports.fetchClassFinderQueryResult = (query) => {

};

/**
 *  handle all class finder query
 * @param queryObject hold all values for parameters to query classfinder
 * @return {Promise<void>}
 */
function fetchClasses(queryObject) {

  let subject1 = queryObject.subject1 || 'dummy';
  let subject2 = queryObject.subject2 || 'dummy';
  let gur1 = queryObject.gur1 || 'dummy';
  let gur2 = queryObject.gur2 || 'dummy';
  let day = queryObject.day || 'dummy';
  let ifOpen = queryObject.ifOpen || 'dummy';
  let crn = queryObject.crn || '';
  let term = queryObject.term;
  let gur3 = queryObject.gur3 || 'All';
  let subject3 = queryObject.subject3 || 'All';
  let instructor = queryObject.instructor || 'ANY';
  let course = queryObject.course || '';
  let beginHour = queryObject.beginHour || '0';
  let beginMinute = queryObject.beginMinute || 'A';
  let endHour = queryObject.endHour || '0';
  let endMinute = queryObject.endMinute || 'A';
  let credits = queryObject.credits || '%25';
  const params = `sel_subj=${subject1}&sel_subj=${subject2}&sel_gur=${gur1}&sel_gur=${gur2}&sel_day=${day}&sel_open=${ifOpen}&sel_crn=${crn}&term=${term}&sel_gur=${gur3}&sel_subj=${subject3}&sel_inst=${instructor}&sel_crse=${course}&begin_hh=${beginHour}&begin_mi=${beginMinute}&end_hh=${endHour}&end_mi=${endMinute}&sel_cdts=${credits}`;
  const params2 = 'sel_subj=dummy&sel_subj=dummy&sel_gur=dummy&sel_gur=dummy&sel_day=dummy&sel_open=dummy&sel_crn=&term=201840&sel_gur=All&sel_subj=CSCI&sel_inst=ANY&sel_crse=&begin_hh=0&begin_mi=A&end_hh=0&end_mi=A&sel_cdts=%25';
  console.log(params === params2);
  // console.log(params);
  const api = {
    method: 'POST',
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    uri: config.classfinderQueryURL,
    body: params
  };
  return rp(api);
}

exports.updateAllTerms = (parsedFrontPage) => {
  // region initialize MongoDB
  // only update the top 4 quarters no matter what
  // once a new quarter appear that is not a current collection
  // drop the lowest numerical number term
  // drop all collections if exists
  const conn = mongoose.connection;
  conn.db.dropDatabase().then((data) => {
    console.log('dropped database');
  }).catch((err) => {
    console.error()
  });
  const currentTerms = [];
  for (let i = 0; i < config.numberOfTermsCached; i++) {
    currentTerms.push(parsedFrontPage.terms[i]);
  }
  //currentTerms.map((term) => {
  //
  //});

  //const Classes = mongoose.model('classes', schemas.class());

  // const Class = new Classes({ name: 'Zildjian' });

  // kitty.save().then(() => console.log('meow'));
  // conn.collection('Cat').insert(kitty);
  const queryObject = {};
  queryObject.subject3 = 'CSCI';
  queryObject.term = 201840;
  fetchClasses(queryObject).then((data) => {
    const parsedData = classparser(data);
    console.log(parsedData);

  }).catch((err) => {
    console.log(err);
  });
};


