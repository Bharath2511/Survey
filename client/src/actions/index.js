import axios from "axios";
import { FETCH_USER } from "./types";

//fetchuser is action creator
export const fetchUser = () =>
  //redux thunk sees if we are returning a function instead of action it
  //will automatically call this function attaching dispatch as function
  async dispatch => {
    //only after hitting that route we want to dispatch an action
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
  };

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  //the user model gets updated whenever this action is dispatched
  //here res.data is the user object itself
  //so the reducer renders all the components
  dispatch({ type: FETCH_USER, payload: res.data });
  //console.log(res.data);
};
