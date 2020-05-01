import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  loadingOptions: ["isLoadingRequest"],
  loadOptions: ["payload"],
  loadReactiveOptions: ["payload"],
  setFieldValues: ["payload"],
  setTableOption: ["payload"],
  removeTableOption: ["payload"],
  loadPagination: [],
  setItemUp: [],
  setItemDown: []
});

const INITIAL_STATE = {
  isLoadingRequest: false,
  isRequestFailed: false,
  navbar: {},
  option: "",
  allCalls: [],
  allStrikes: [],
  allPuts: [],
  calls: [],
  strikes: [],
  puts: [],
  allOptions: [],
  pagination: {
    itemsAbove: 0,
    itemsBelow: 0,
    itemsPerPage: 15,
    initialItemIndex: 0
  }
};

const loadingOptions = (state, { isLoadingRequest }) => {
  return {
    ...state,
    isLoadingRequest
  };
};

const setFieldValues = (state, { payload }) => {
  const { field, values } = payload;

  return {
    ...state,
    [field]: values
  };
};

const setTableOption = (state, { payload }) => {
  if (state.allOptions.length < 6) {
    if (
      state.allOptions.filter(({ id }) => id === payload.id).length > 0 &&
      payload.cv === undefined
    ) {
      const cv = state.allOptions.filter(({ id }) => id === payload.id)[0].cv;

      const optionIndex = state.allOptions.indexOf(
        state.allOptions.filter(({ id }) => id === payload.id)[0]
      );

      if (cv === "sell") {
        const allOptions = state.allOptions.filter(
          ({ id }) => id !== payload.id
        );

        allOptions.splice(optionIndex, 0, {
          ...state.allOptions[optionIndex],
          cv: "buy",
          initials: "C"
        });

        return {
          ...state,
          allOptions
        };
      } else {
        const allOptions = state.allOptions.filter(
          ({ id }) => id !== payload.id
        );

        allOptions.splice(optionIndex, 0, {
          ...state.allOptions[optionIndex],
          cv: "sell",
          initials: "V"
        });

        return {
          ...state,
          allOptions
        };
      }
    }
  }

  if (state.allOptions.length < 6) {
    return {
      ...state,
      allOptions: [
        ...state.allOptions,
        {
          ...payload,
          initials: payload.cv === "buy" ? "C" : "V",
          quantity: 0
        }
      ]
    };
  } else {
    return {
      ...state
    };
  }
};

const removeTableOption = (state, { payload }) => {
  const { id } = payload;

  const allOptions = state.allOptions.filter(option => option.id !== id);

  return {
    ...state,
    allOptions
  };
};

const loadPagination = state => {
  const itemsBelow = state.strikes.length - state.pagination.itemsPerPage;

  const { initialItemIndex, itemsPerPage } = state.pagination;

  const calls = state.calls.slice(initialItemIndex, itemsPerPage);
  const strikes = state.strikes.slice(initialItemIndex, itemsPerPage);
  const puts = state.puts.slice(initialItemIndex, itemsPerPage);

  return {
    ...state,
    calls,
    strikes,
    puts,
    pagination: {
      ...state.pagination,
      itemsBelow
    }
  };
};

const setItemUp = state => {
  const {
    initialItemIndex,
    itemsPerPage,
    itemsAbove,
    itemsBelow
  } = state.pagination;

  const calls = state.allCalls.slice(initialItemIndex - 1, itemsPerPage - 1);
  const strikes = state.allStrikes.slice(
    initialItemIndex - 1,
    itemsPerPage - 1
  );
  const puts = state.allPuts.slice(initialItemIndex - 1, itemsPerPage - 1);

  return {
    ...state,
    calls,
    strikes,
    puts,
    pagination: {
      ...state.pagination,
      itemsAbove: itemsAbove - 1,
      itemsBelow: itemsBelow + 1,
      itemsPerPage: itemsPerPage - 1,
      initialItemIndex: initialItemIndex - 1
    }
  };
};

const setItemDown = state => {
  const {
    initialItemIndex,
    itemsPerPage,
    itemsAbove,
    itemsBelow
  } = state.pagination;

  const calls = state.allCalls.slice(initialItemIndex + 1, itemsPerPage + 1);
  const strikes = state.allStrikes.slice(
    initialItemIndex + 1,
    itemsPerPage + 1
  );
  const puts = state.allPuts.slice(initialItemIndex + 1, itemsPerPage + 1);

  return {
    ...state,
    calls,
    strikes,
    puts,
    pagination: {
      ...state.pagination,
      itemsAbove: itemsAbove + 1,
      itemsBelow: itemsBelow - 1,
      itemsPerPage: itemsPerPage + 1,
      initialItemIndex: initialItemIndex + 1
    }
  };
};

export { Types as OptionsTypes };

export { Creators as optionsActions };

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOADING_OPTIONS]: loadingOptions,
  [Types.SET_FIELD_VALUES]: setFieldValues,
  [Types.SET_TABLE_OPTION]: setTableOption,
  [Types.REMOVE_TABLE_OPTION]: removeTableOption,
  [Types.LOAD_PAGINATION]: loadPagination,
  [Types.SET_ITEM_UP]: setItemUp,
  [Types.SET_ITEM_DOWN]: setItemDown
});
