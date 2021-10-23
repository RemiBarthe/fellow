import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';
export const SET_START_ANIMATION_OVER = 'SET_START_ANIMATION_OVER';
export const SET_USER_SPACES = 'SET_USER_SPACES';

const vuexPersist = new VuexPersist({
  storage: window.localStorage,
  reducer: (state) => ({
    connectedUser: state.connectedUser,
    spaces: state.spaces
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
      spaces: {},
      startAnimationOver: false
    };
  },
  actions: {
    setConnectedUser({ commit }, payload) {
      commit(SET_CONNECTED_USER, payload);
    },
    setStartAnimationOver({ commit }, payload) {
      commit(SET_START_ANIMATION_OVER, payload);
    },
    setSpaces({ commit }, payload) {
      onSnapshot(
        collection(db, 'users', payload, 'spaces'),
        (querySnapshot) => {
          const spaces = [];
          querySnapshot.forEach((doc) => {
            let id = doc.id;
            spaces.push({ id, ...doc.data() });
          });
          commit(SET_USER_SPACES, spaces);
        }
      );
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
    },
    [SET_USER_SPACES](state, payload) {
      state.spaces = payload;
    }
  },
  plugins: [vuexPersist.plugin]
});
