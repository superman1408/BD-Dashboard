import {
  CREATE_CONTRACT,
  CONTRACT_PDF,
  GET_CONTRACT,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (contract = [], action) => {
  switch (action.type) {
    case CREATE_CONTRACT:
      return [...contract, action.paylaod];

    case CONTRACT_PDF:
      return [...contract, action.paylaod];

    case GET_CONTRACT:
      return [...contract, action.paylaod];

    default:
      return contract;
  }
};
