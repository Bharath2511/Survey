import axios from "axios";
import { FETCH_USER } from "./types";

//fetchuser is action creator
export const fetchUser = () =>
  //redux thunk sees if we are returning a function instead of action it
  //will automatically call this function attaching dispatch as function
  async dispatch => {
    //only after hitting that route we want to dispatch an action
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res });
  };
