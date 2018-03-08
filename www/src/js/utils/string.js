export const truncate = str =>
  str.length <= 250 ? str : `${str.substr(0, 250)}...`;
