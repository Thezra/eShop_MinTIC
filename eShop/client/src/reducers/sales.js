import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_SALE, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isSaleLoading: true, sales: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        sales: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, sales: action.payload.data };
    case FETCH_SALE:
      return { ...state, sale: action.payload.sale };
    case LIKE:
      return { ...state, sales: state.sales.map((sale) => (sale._id === action.payload._id ? action.payload : sale)) };
    case COMMENT:
      return {
        ...state,
        sales: state.sales.map((sale) => {
          if (sale._id == +action.payload._id) {
            return action.payload;
          }
          return sale;
        }),
      };
    case CREATE:
      return { ...state, sales: [...state.sales, action.payload] };
    case UPDATE:
      return { ...state, sales: state.sales.map((sale) => (sale._id === action.payload._id ? action.payload : sale)) };
    case DELETE:
      return { ...state, sales: state.sales.filter((sale) => sale._id !== action.payload) };
    default:
      return state;
  }
};

