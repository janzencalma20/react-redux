import { displayNames } from '../utils/displaynames';

export const getDisplayName = (key) => {
  if (displayNames[key]) {
    return displayNames[key]
  } else {
    return key
  }
};

export const getRotorSlotName = (key) => {
  const _key = `${key}_rotor`;
  if (displayNames[_key]) {
    return displayNames[_key]
  } else {
    return key;
  }
};