import { CREATE_CONTRACT } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (contract = [], action) => {
  switch (action.type) {
    case CREATE_CONTRACT:
      return [...contract, action.paylaod];

    default:
      return contract;
  }
};
