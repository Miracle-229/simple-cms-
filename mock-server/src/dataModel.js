const { v4: uuidv4 } = require('uuid');

const types = [
  {
    id: uuidv4(),
    slug: 'type-one',
    name: 'Type One',
  },
  {
    id: uuidv4(),
    slug: 'type-two',
    name: 'Type Two',
  },
  {
    id: uuidv4(),
    slug: 'type-three',
    name: 'Type Three',
  },
];
const documents = [
  {
    id: uuidv4(),
    slug: 'document-one',
    title: 'Document One',
    created: new Date('05 October 2011 14:48 UTC').toISOString(),
    updated: new Date('03 June 2021 18:58 UTC').toISOString(),
    typeID: types[0].id,
  },
  {
    id: uuidv4(),
    slug: 'document-two',
    title: 'Document Two',
    created: new Date('23 November 2015 17:32 UTC').toISOString(),
    updated: new Date('03 April 2023 09:44 UTC').toISOString(),
    typeID: types[1].id,
  },
  {
    id: uuidv4(),
    slug: 'document-three',
    title: 'Document Three',
    created: new Date('12 September 2009 10:12 UTC').toISOString(),
    updated: new Date('29 December 2011 23:18 UTC').toISOString(),
    typeID: types[2].id,
  },
];

module.exports = {
  types,
  documents,
}