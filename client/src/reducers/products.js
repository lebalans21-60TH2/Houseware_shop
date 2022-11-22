import * as Types from "../constants/ActionTypes";
var findIndex = (products, id) => {
  var result = -1;
  products.forEach((product, index) => {
    if (product._id === id) {
      result = index;
    }
  });
  return result;
};
export default function(state = {}, action) {
  var index = -1;
  switch (action.type) {
    case Types.GET_PRODUCTS_BY_SELL:
      return { ...state, productsBySell: action.payload };
    case Types.GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, productsByArrival: action.payload };
    case Types.GET_PRODUCTS_NEW:
      return { ...state, newProducts: action.payload };
    case Types.SEARCH_PRODUCT:
      return { ...state, resultsProduct: action.payload };
    case Types.GET_BRANDS:
      return { ...state, brands: action.payload };
    case Types.GET_TYPE:
      return { ...state, types: action.payload };
    case Types.GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload.articles,
        size: action.payload.size
      };
    case Types.GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload
      };
    case Types.CLEAR_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };
    case "DELETE":
      index = findIndex(state.allProducts, action.id);
      state.allProducts.splice(index, 1);
      return { ...state };
    default:
      return state;
  }
}
