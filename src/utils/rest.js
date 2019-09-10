import { useEffect, useReducer } from "react";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: "",
  code: 0
};

const reducer = (state, action) => {
  if (action.type === "REQUEST") {
    return {
      ...state,
      loading: true
    };
  }
  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      data: action.data
    };
  }
  if (action.type === "FAILURE") {
    return {
      ...state,
      loading: false,
      data: action.error,
      code: action.code
    };
  }
  return state;
};

const getAuth = () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return "?auth=" + token;
  }
  return "";
};

const init = baseURL => {
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const carregar = async () => {
      try {
        dispatch({ type: "REQUEST" });
        const response = await axios.get(
          baseURL + resource + ".json" + getAuth()
        );
        dispatch({ type: "SUCCESS", data: response.data });
      } catch (err) {
        dispatch({
          type: "FAILURE",
          error: err.response.data.error,
          code: err.response.status
        });
      }
    };
    useEffect(() => {
      carregar();
    }, [resource]);
    return { ...data, refetch: carregar };
  };

  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const post = async data => {
      dispatch({ type: "REQUEST" });
      const response = await axios.post(
        baseURL + resource + ".json" + getAuth(),
        data
      );
      dispatch({ type: "SUCCESS", data: response.data });
    };
    return [data, post];
  };

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const remove = async resource => {
      dispatch({ type: "REQUEST" });
      await axios.delete(baseURL + resource + ".json" + getAuth());
      dispatch({ type: "SUCCESS" });
    };
    return [data, remove];
  };

  const usePatch = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const patch = async (resource, data) => {
      dispatch({ type: "REQUEST" });
      await axios.patch(baseURL + resource + ".json" + getAuth(), data);
      dispatch({ type: "SUCCESS" });
    };
    return [data, patch];
  };

  return { useGet, usePost, useDelete, usePatch };
};

export const usePost = resource => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
  const post = async data => {
    dispatch({ type: "REQUEST" });
    try {
      const response = await axios.post(resource, data);
      console.log("resp oj", response);
      dispatch({
        type: "SUCCESS",
        data: response.data,
        code: response.data.status
      });
      return response.data;
    } catch (errors) {
      dispatch({
        type: "FAILURE",
        error: errors.response.data.error.message,
        code: errors.response.data.error.code
      });
    }
  };
  return [data, post];
};

export default init;
