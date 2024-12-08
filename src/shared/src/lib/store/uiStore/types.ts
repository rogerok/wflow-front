interface IUiBaseStore<T> {
  init(): void;
  setState(state: T): void;
  saveToStorage(state: T): void;
  getStateFromStorage(): unknown;
  validateState(state: unknown): state is T;
  get currentState(): T;
}
