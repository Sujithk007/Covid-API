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
        if (details.delta.confirmed) {
          conformedList.push({ x: dateKey[i], y: details.delta.confirmed });
        } else {
          // console.log(state, dateKey[i]);
        }
        if (details.delta.recovered) {
          recoveredList.push({ x: dateKey[i], y: details.delta.recovered });
        } else {
          // console.log(state, dateKey[i]);
        }
        if (details.delta.tested) {
          testedList.push({ x: dateKey[i], y: details.delta.tested });
        } else {
          // console.log(state, dateKey[i]);
        }
        if (details.delta.deceased) {
          deadList.push({ x: dateKey[i], y: details.delta.deceased });
        } else {
          // console.log(state, dateKey[i]);
        }
        if (details.delta.vaccinated) {
          vaccinatedList.push({ x: dateKey[i], y: details.delta.vaccinated });
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
