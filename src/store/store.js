import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import defaultState from './defaultState';

export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';
export const SET_START_ANIMATION_OVER = 'SET_START_ANIMATION_OVER';
export const SET_USER_SPACES = 'SET_USER_SPACES';
export const SET_SELECTED_SPACE = 'SET_SELECTED_SPACE';
export const SET_UNSUBSCRIBE_USER_SPACES = 'SET_UNSUBSCRIBE_USER_SPACES';
export const SET_STATE_TO_DEFAULT = 'SET_STATE_TO_DEFAULT';

const vuexPersist = new VuexPersist({
  storage: window.localStorage,
  reducer: (state) => ({
    connectedUser: state.connectedUser,
    spaces: state.spaces,
    selectedSpaceId: state.selectedSpaceId
  })
});

export const store = createStore({
  state() {
    return {
      ...defaultState
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
      const unsubscribe = onSnapshot(
        collection(db, 'users', payload, 'spaces'),
        (querySnapshot) => {
          const spaces = [];
          querySnapshot.forEach((doc) => {
            let id = doc.id;
            spaces.push({ id, ...doc.data() });
          });
          commit(SET_USER_SPACES, spaces);
          commit(SET_UNSUBSCRIBE_USER_SPACES, unsubscribe);
        }
      );
    },
    setSelectedSpace({ commit }, payload) {
      commit(SET_SELECTED_SPACE, payload);
    },
    setStateToDefault({ commit }) {
      commit(SET_STATE_TO_DEFAULT);
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
    },
    [SET_SELECTED_SPACE](state, payload) {
      state.selectedSpaceId = payload;
    },
    [SET_UNSUBSCRIBE_USER_SPACES](state, payload) {
      state.unsubscribeUserSpaces = payload;
    },
    [SET_STATE_TO_DEFAULT](state) {
      Object.assign(state, defaultState);
    }
  },
  plugins: [vuexPersist.plugin]
});
