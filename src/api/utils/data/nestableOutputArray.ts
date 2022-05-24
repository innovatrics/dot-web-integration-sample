const nestableOutputArray = [
  {
    name: 'a',
    a: [
      {
        name: 'a',
        a: 1,
        b: 1,
      },
      {
        name: 'b',
        a: 2,
        b: 2,
      },
    ],
  },
  {
    name: 'b',
    a: [
      {
        name: 'a',
        a: 3,
        b: 3,
      },
      {
        name: 'b',
        a: 4,
        b: 4,
      },
    ],
  },
];

export default nestableOutputArray;
