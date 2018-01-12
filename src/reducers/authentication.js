import { CHANGE_AUTH } from '../actions/types';

// By default start as not logged in
export default function(state = false, action) {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;
  }

  return state;
}
