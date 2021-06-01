const states = require("./state.json");

const dataFilter = (raw_data) => {
  var data = {};
  var conformedList = [];
  var recoveredList = [];
  var testedList = [];
  var deadList = [];
  var vaccinatedList = [];
  for (var state in raw_data) {
    if (state === "TT" || state === "UN") {
    //   console.log("Union places");
    } else {
      conformedList = [];
      recoveredList = [];
      testedList = [];
      deadList = [];
      vaccinatedList = [];
      var datesList = raw_data[state]["dates"];
      const dateKey = Object.keys(datesList).sort().slice(-10);
      for (let i = 0; i <= 9; i++) {
        const details = datesList[dateKey[i]];
        if (details.total.confirmed) {
          conformedList.push({ x: dateKey[i], y: details.total.confirmed });
        } else {
          // console.log(state, dateKey[i]);
        }
        if (details.total.recovered) {
          recoveredList.push({ x: dateKey[i], y: details.total.recovered });
        } else {
          // console.log(state, dateKey[i]);
        }
        if (details.total.tested) {
          testedList.push({ x: dateKey[i], y: details.total.tested });
        } else {
          // console.log(state, dateKey[i]);
        }
        if (details.total.deceased) {
          deadList.push({ x: dateKey[i], y: details.total.deceased });
        } else {
          // console.log(state, dateKey[i]);
        }
        if (details.total.vaccinated) {
          vaccinatedList.push({ x: dateKey[i], y: details.total.vaccinated });
        } else {
          // console.log(state, dateKey[i]);
        }
      }
      var stateName = states[state];
      data[stateName] = {
        tested: testedList,
        conformed: conformedList,
        recovered: recoveredList,
        dead: deadList,
        vaccinated: vaccinatedList,
      };
    }
  }
  return data;
};

module.exports = dataFilter;
