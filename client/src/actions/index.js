import axios from "axios";
import { FETCH_USER } from "./types";

//fetchuser is action creator
export const fetchUser = () => {
  //redux thunk sees if we are returning a function instead of action it
  //will automatically call this function attaching dispatch as function
  return function(dispatch) {
    //only after hitting that route we want to dispatch an action
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
