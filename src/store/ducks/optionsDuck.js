import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  loadingOptions: ["isLoadingRequest"],
  loadOptions: ["payload"],
  loadNavbarOptions: ["payload"],
  setFieldValues: ["payload"],
  setTableCallOption: ["payload"],
  removeTableCallOption: ["payload"],
  setTablePutOption: ["payload"],
  removeTablePutOption: ["payload"]
});

const INITIAL_STATE = {
  isLoadingRequest: false,
  isRequestFailed: false,
  navbar: {},
  option: "",
  calls: [],
  strikes: [],
  puts: [],
  allOptions: []
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

const setTableCallOption = (state, { payload }) => {
  if (state.allOptions.length < 6) {
    if (
      state.calls.filter(({ id }) => id === payload.id).length > 0 &&
      payload.cv === undefined
    ) {
      const index = state.calls.indexOf(
        state.calls.filter(({ id }) => id === payload.id)[0]
      );

      const cv = state.calls.filter(({ id }) => id === payload.id)[0].cv;

      const optionIndex = state.allOptions.indexOf(
        state.allOptions.filter(({ id }) => id === payload.id)[0]
      );

      if (cv === "sell") {
        const calls = state.calls.filter(({ id }) => id !== payload.id);

        const allOptions = state.allOptions.filter(
          ({ id }) => id !== payload.id
        );

        calls.splice(index, 0, {
          cv: "buy",
          initials: "C",
          id: payload.id
        });

        allOptions.splice(optionIndex, 0, {
          ...state.allOptions[optionIndex],
          cv: "buy"
        });

        return {
          ...state,
          calls,
          allOptions
        };
      } else {
        const calls = state.calls.filter(({ id }) => id !== payload.id);

        const allOptions = state.allOptions.filter(
          ({ id }) => id !== payload.id
        );

        calls.splice(index, 0, {
          cv: "sell",
          initials: "V",
          id: payload.id
        });

        allOptions.splice(optionIndex, 0, {
          ...state.allOptions[optionIndex],
          cv: "sell"
        });

        return {
          ...state,
          calls,
          allOptions
        };
      }
    }
  }

  if (state.allOptions.length < 6) {
    return {
      ...state,
      calls: [
        ...state.calls,
        {
          cv: payload.cv,
          initials: payload.cv === "buy" ? "C" : "V",
          id: payload.id
        }
      ],
      allOptions: [
        ...state.allOptions,
        {
          ...payload,
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

const removeTableCallOption = (state, { payload }) => {
  const { id } = payload;

  const calls = state.calls.filter(call => call.id !== id);

  const allOptions = state.allOptions.filter(option => option.id !== id);

  return {
    ...state,
    calls,
    allOptions
  };
};

const setTablePutOption = (state, { payload }) => {
  if (state.allOptions.length < 6) {
    if (
      state.puts.filter(({ id }) => id === payload.id).length > 0 &&
      payload.cv === undefined
    ) {
      const index = state.puts.indexOf(
        state.puts.filter(({ id }) => id === payload.id)[0]
      );

      const cv = state.puts.filter(({ id }) => id === payload.id)[0].cv;

      const optionIndex = state.allOptions.indexOf(
        state.allOptions.filter(({ id }) => id === payload.id)[0]
      );

      if (cv === "sell") {
        const puts = state.puts.filter(({ id }) => id !== payload.id);

        const allOptions = state.allOptions.filter(
          ({ id }) => id !== payload.id
        );

        puts.splice(index, 0, {
          cv: "buy",
          initials: "C",
          id: payload.id
        });

        allOptions.splice(optionIndex, 0, {
          ...state.allOptions[optionIndex],
          cv: "buy"
        });

        return {
          ...state,
          puts,
          allOptions
        };
      } else {
        const puts = state.puts.filter(({ id }) => id !== payload.id);

        const allOptions = state.allOptions.filter(
          ({ id }) => id !== payload.id
        );

        puts.splice(index, 0, {
          cv: "sell",
          initials: "V",
          id: payload.id
        });

        allOptions.splice(optionIndex, 0, {
          ...state.allOptions[optionIndex],
          cv: "sell"
        });

        return {
          ...state,
          puts,
          allOptions
        };
      }
    }
  }

  if (state.allOptions.length < 6) {
    return {
      ...state,
      puts: [
        ...state.puts,
        {
          cv: payload.cv,
          initials: payload.cv === "buy" ? "C" : "V",
          id: payload.id
        }
      ],
      allOptions: [
        ...state.allOptions,
        {
          ...payload,
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

const removeTablePutOption = (state, { payload }) => {
  const { id } = payload;

  const puts = state.puts.filter(put => put.id !== id);

  const allOptions = state.allOptions.filter(option => option.id !== id);

  return {
    ...state,
    puts,
    allOptions
  };
};

export { Types as OptionsTypes };

export { Creators as optionsActions };

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOADING_OPTIONS]: loadingOptions,
  [Types.SET_FIELD_VALUES]: setFieldValues,
  [Types.SET_TABLE_CALL_OPTION]: setTableCallOption,
  [Types.REMOVE_TABLE_CALL_OPTION]: removeTableCallOption,
  [Types.SET_TABLE_PUT_OPTION]: setTablePutOption,
  [Types.REMOVE_TABLE_PUT_OPTION]: removeTablePutOption
});
