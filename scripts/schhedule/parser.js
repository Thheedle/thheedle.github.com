const htmlparser2 = require('htmlparser2');

/**
 *
 * @param page {string}: the html code from a Classfinder department course listing
 * @returns classList {Array} An array of objects that are the characteristics of each class contained in the input
 */
module.exports = (function classParser(page) {
  let CRNList = [];
// Class array is filled with the indiv classes information, but not parsed yet
  let ClassArray = [];
  let indivClassArray = [];
  let firstDate = (Date.now());
  const parser = new htmlparser2.Parser({
    onopentag: (name, attributes) => {
      // Grabbing the CRN value of each course
      if (name === 'input') {
        if ((Object.keys(attributes).includes('name'))) {
          if (attributes.name === 'sel_crn') {
            CRNList.push(attributes.value);
          }
        }
      }
    },
    // Grabbing the plaintext information about each course
    ontext: (text) => {
      if (!(text === '\n' || text === '&nbsp')) {
        // Each course is separated by 5 whitespace characters OR a waitlist message
        if (text === '     ' || text === "CLOSED:   Waitlist Available " || text.trim() === 'CLOSED') {
          ClassArray.push(indivClassArray);
          indivClassArray = [];
        }
        // If still on the current class, push the text buffer
        else {
          indivClassArray.push(text);
        }
      }
    }
  });

// Run the parser
  parser.write(page);
// Push the final class into ClassArray
  ClassArray.push(indivClassArray);


// Removing the junk that comes before the actual classes
  ClassArray = ClassArray.slice(1);

// Matching the CRNs to the actual classes
  CRNList.forEach((CRN, index) => {

    if(ClassArray[index]) {
      ClassArray[index].unshift(CRN);
    }

  });

  let classList = [];
  console.log(ClassArray[0]);
  console.log(ClassArray[1]);
    console.log(ClassArray[2]);



    ClassArray.forEach((aClass) => {

    // Regex's that we will use for making decisions later
    let regex = /[0-9]/;
    let regex1 = /^ [MTWRF]{1,5}/;

    // This is the structure of the class objects
    let aClassObject = {
      Class: '',
      CourseName: '',
      CRN: '',
      Capacity: '',
      CurrentEnrolled: '',
      SeatsAvailable: '',
      Instructor: '',
      startToEnd: '',
      CourseAttribute: '',
      Time_Location: [],
      Credits: '',
      costPerCred: '',
    };
    // i is the index for the list that we are parsing from, used for some branching decisions
    let i = 0;
    aClassObject.CRN = aClass[i++].trim();

    aClassObject.Class = aClass[i++].trim();
    aClassObject.CourseName = aClass[i++].trim();
    aClassObject.Capacity = aClass[i++].trim();
    aClassObject.CurrentEnrolled = aClass[i++].trim();
    aClassObject.SeatsAvailable = aClass[i++].trim();
    aClassObject.Instructor = aClass[i++].trim();
    aClassObject.startToEnd = aClass[i++].trim();


    // If the course does not have a course attribute
    // We will leave courseAttribute as an empty string
    if (!(regex.test(aClass[i])) && !(aClass[i] === 'TBA')) {
      aClassObject.CourseAttribute = aClass[i++];
    }
    aClassObject.Time_Location.push(aClass[i++].trim());
    // indexTime_Location is the index in the time list that we have to tell what room matches what time
    let indexTime_location = 0;
    aClassObject.Time_Location[indexTime_location] = aClassObject.Time_Location[indexTime_location] + ', ' + ((aClass[i++]).replace('&nbsp', '').trim());
    aClassObject.Credits = aClass[i++].trim();
      // Seeing if the class list has more information in it, as this is the natural
      // place for the class info to cut off for certain majors
    if(aClass.length <= i) {
      classList.push(aClassObject);
    }
    else {
        // Grabbing the course credit cost from the list if it exists
        if (aClass[i].includes('$')) {
            aClassObject.costPerCred = aClass[i++].trim();
        }
        // This for loop goes through the remainder of the list and grans the rest of the room date pairs
        for (let j = i; j < aClass.length; j++) {
            if (regex1.test(aClass[j])) {
                aClassObject.Time_Location.push((aClass[j] + ', ' + aClass[j + 1]).trim());
                j++;
            }
        }
        // Pushing the object so we end up with a list of class objects
        classList.push(aClassObject)
    }
  });
  return (classList);
});