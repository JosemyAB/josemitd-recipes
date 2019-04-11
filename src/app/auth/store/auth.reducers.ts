import {Action} from '@ngrx/store';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: Action) {
  return this.state;
}
