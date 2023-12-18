import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    isAuthenticated: false,
    myHistories: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setMyHistories(state, histories) {
      state.myHistories = histories;
    },
    addHistory(state, history) {
      state.myHistories.push(history);
    },
  },
});

export default store;
