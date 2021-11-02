import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import defaultState from './defaultState';

export const SET_CONNECTED_USER = 'SET_CONNECTED_USER';
export const SET_START_ANIMATION_OVER = 'SET_START_ANIMATION_OVER';
export const FETCH_SPACES = 'FETCH_SPACES';
export const SET_SELECTED_SPACE = 'SET_SELECTED_SPACE';
export const SET_UNSUBSCRIBE_SPACES = 'SET_UNSUBSCRIBE_SPACES';
export const FETCH_TICKETS = 'FETCH_TICKETS';
export const SET_UNSUBSCRIBE_TICKETS = 'SET_UNSUBSCRIBE_TICKETS';
export const SET_STATE_TO_DEFAULT = 'SET_STATE_TO_DEFAULT';

const vuexPersist = new VuexPersist({
  storage: window.localStorage,
  reducer: (state) => ({
    connectedUser: state.connectedUser,
    spaces: state.spaces,
    selectedSpace: state.selectedSpace,
    tickets: state.tickets
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
    fetchSpaces({ commit }, payload) {
      const unsubscribe = onSnapshot(
        collection(db, 'users', payload, 'spaces'),
        (querySnapshot) => {
          const spaces = [];
          querySnapshot.forEach((doc) => {
            let id = doc.id;
            spaces.push({ id, ...doc.data() });
          });
          commit(FETCH_SPACES, spaces);
          commit(SET_UNSUBSCRIBE_SPACES, unsubscribe);
        }
      );
    },
    setSelectedSpace({ commit }, payload) {
      commit(SET_SELECTED_SPACE, payload);
    },
    fetchTickets({ commit }, payload) {
      const unsubscribe = onSnapshot(
        collection(db, 'users', payload.userId, 'spaces', payload.spaceId, 'tickets'),
        (querySnapshot) => {
          const tickets = [];
          querySnapshot.forEach((doc) => {
            let id = doc.id;
            tickets.push({ id, ...doc.data() });
          });
          commit(FETCH_TICKETS, tickets);
          commit(SET_UNSUBSCRIBE_TICKETS, unsubscribe);
        }
      );
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
    [FETCH_SPACES](state, payload) {
      state.spaces = payload;
    },
    [SET_SELECTED_SPACE](state, payload) {
      state.selectedSpace = payload;
    },
    [SET_UNSUBSCRIBE_SPACES](state, payload) {
      state.unsubscribeSpaces = payload;
    },
    [FETCH_TICKETS](state, payload){
      state.tickets = payload;
    },
    [SET_UNSUBSCRIBE_TICKETS](state, payload) {
      state.unsubscribeTickets = payload;
    },
    [SET_STATE_TO_DEFAULT](state) {
      Object.assign(state, defaultState);
    }
  },
  plugins: [vuexPersist.plugin]
});
