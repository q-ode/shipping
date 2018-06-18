/**
 * Sorts a give list based on the count of the elements and for elements with
 * the same count it sorts alphabetically.
 *
 * @param {Array} list - list to be sorted
 *
 * @return {Array}
 */
const sortByCountAndAlphabet = (list) => {
  const groupedList = groupByCount(list);

  const sortedByKey = groupedList.sort((a, b) => {
    return parseInt(b.key) - parseInt(a.key);
  });

  const sortedByValues = sortedByKey.map((element) => {
    element.values.sort();
    return element;
  });

  const itemsSortedByCountAndValues = [];
  // flatten the map and reconstruct the item objects
  sortedByValues.forEach((element) => {
    element.values.forEach((value) => {
      itemsSortedByCountAndValues.push({ item: value, count: element.key });
    });
  });

  return itemsSortedByCountAndValues;
};

/**
 * This takes in a list of items with their counts and groups all elements with
 * the same count in an array.
 *
 * @param list - array to be grouped
 *
 * @return {Array} - an array of objects with the keys as the count and the
 * values as the item names
 */
const groupByCount = (list) => {
  return list.reduce((accumulator, current) => {
    const countOfCurrent = current['count'];

    let isExistingKey = false;
    accumulator.map((element) => {
      if (element.key === countOfCurrent) {
        isExistingKey = true;
        element.values.push(current.item);
      }
    });

    if (!isExistingKey) {
      accumulator.push({ key: countOfCurrent, values: [current.item] });
    }

    return accumulator;
  }, []);
};

module.exports = {
  sortByCountAndAlphabet,
  groupByCount
};