import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';

export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';

const vuexPersist = new VuexPersist({
  storage: window.localStorage
});

export const store = createStore({
  state() {
    return {
      test: 'https://www.npmjs.com/package/vuex-persistedstate',
      connectedUser: {
        displayName: '',
        email: '',
        metadata: {},
        photoUrl: '',
        uid: ''
      }
    };
  },
  actions: {
    setConnectedUser({ commit }, payload) {
      commit(SET_CONNECTED_USER, payload);
    }
  },
  mutations: {
    [SET_CONNECTED_USER](state, payload) {
      state.connectedUser.displayName = payload.displayName;
      state.connectedUser.email = payload.email;
      state.connectedUser.metadata = payload.metadata;
      state.connectedUser.photoUrl = payload.photoUrl;
      state.connectedUser.uid = payload.uid;
    }
  },
  plugins: [vuexPersist.plugin]
});
