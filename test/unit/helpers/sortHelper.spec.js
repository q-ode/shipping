const chai = require('chai');
const expect = chai.expect;

const sortHelper = require('../../../helpers/sortHelper');

describe('Sort Helper', () => {
  describe('#groupByCount', () => {
    it('Should group all items values by their counts', () => {
      const unGroupedList = [
        {
          "item": "Inline Skates",
          "count": "2"
        },
        {
          "item": "Macbook",
          "count": "2"
        },
        {
          "item": "Book \"Cooking 101\"",
          "count": "1"
        },
        {
          "item": "Book \"Guide to Hamburg\"",
          "count": "1"
        },
        {
          "item": "Flux compensator",
          "count": "1"
        },
        {
          "item": "Playstation 4",
          "count": "1"
        }
      ];

      const groupedList = [
        { key: '2', values: ['Inline Skates', 'Macbook'] },
        {
          key: '1',
          values: [
            'Book "Cooking 101"',
            'Book "Guide to Hamburg"',
            'Flux compensator',
            'Playstation 4'
          ]
        }];

      expect(sortHelper.groupByCount(unGroupedList)).to.deep.equal(groupedList);

    });
  });

  describe('#sortByCountAndAlphabet', () => {
    it('Should sort all items by their counts and alphabetically for same counts',
      () => {
        const unSortedList = [
          {
            "item": "Macbook",
            "count": "2"
          },
          {
            "item": "Inline Skates",
            "count": "2"
          },
          {
            "item": "Playstation 4",
            "count": "1"
          },
          {
            "item": "Book \"Guide to Hamburg\"",
            "count": "1"
          },
          {
            "item": "Flux compensator",
            "count": "1"
          },
          {
            "item": "Book \"Cooking 101\"",
            "count": "1"
          }
        ];

        const sortedList = [
          {
            "item": "Inline Skates",
            "count": "2"
          },
          {
            "item": "Macbook",
            "count": "2"
          },
          {
            "item": "Book \"Cooking 101\"",
            "count": "1"
          },
          {
            "item": "Book \"Guide to Hamburg\"",
            "count": "1"
          },
          {
            "item": "Flux compensator",
            "count": "1"
          },
          {
            "item": "Playstation 4",
            "count": "1"
          }
        ];

        expect(sortHelper.sortByCountAndAlphabet(unSortedList)).to.deep.equal(sortedList);

      });
  });
});
