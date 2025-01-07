interface IUiBaseStore<T> {
  init(): void;

  setState(state: T): void;

  saveStateToStorage(state: T): void;

  getStateFromStorage(): unknown;

  validateState(state: unknown): state is T;

  get currentState(): T;
}
