export const isEmpty = (value) => {
  return !value;
};

export const isStateValid = (state) => {
  if (!isEmpty(state)) {
    return state.length === 2;
  }
  return false;
};

export const isPhoneNumberValid = (phone) => {
  if (!isEmpty(phone)) {
    return phone.length === 10;
  }
  return false;
};
