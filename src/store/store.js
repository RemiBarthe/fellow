import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';

export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';
export const SET_START_ANIMATION_OVER = 'SET_START_ANIMATION_OVER';

const vuexPersist = new VuexPersist({
  storage: window.localStorage,
  reducer: (state) => ({
    connectedUser: state.connectedUser
  })
});

export const store = createStore({
  state() {
    return {
      connectedUser: {
        displayName: '',
        email: '',
        creationTime: '',
        lastSignInTime: '',
        photoUrl: '',
        uid: ''
      },
      startAnimationOver: false
    };
  },
  actions: {
    setConnectedUser({ commit }, payload) {
      commit(SET_CONNECTED_USER, payload);
    },
    setStartAnimationOver({ commit }, payload) {
      commit(SET_START_ANIMATION_OVER, payload);
    }
  },
  mutations: {
    [SET_CONNECTED_USER](state, payload) {
      state.connectedUser.displayName = payload.displayName;
      state.connectedUser.email = payload.email;
      state.connectedUser.creationTime = payload.creationTime;
      state.connectedUser.lastSignInTime = payload.lastSignInTime;
      state.connectedUser.photoUrl = payload.photoUrl;
      state.connectedUser.uid = payload.uid;
    },
    [SET_START_ANIMATION_OVER](state, payload) {
      state.startAnimationOver = payload;
    }
  },
  plugins: [vuexPersist.plugin]
});
