type actionType<T> = (payload: T) => { type: string; payload: T };

export function createAction<T>(type: string): [string, actionType<T>] {
  const action: actionType<T> = (payload) => ({ type, payload });
  return [type, action];
}
