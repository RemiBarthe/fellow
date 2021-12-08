import { mount } from '@vue/test-utils';
import StartAnimation from '@/containers/StartAnimation.vue';
import { createStore } from 'vuex';

describe('StartAnimation.vue', () => {
  const store = createStore({
    state() {
      return {
        startAnimationOver: false
      };
    },
    mutations: {
      SET_START_ANIMATION_OVER(state, payload) {
        state.startAnimationOver = payload;
      }
    }
  });

  const animateTitle = jest.fn();
  let wrapper = mount(StartAnimation, {
    global: {
      plugins: [store]
    }
  });

  it('calls store "setStartAnimationOver" action', async () => {
    store.commit('SET_START_ANIMATION_OVER', true);
    expect(store.state.startAnimationOver).toBe(true);
  });

  it('calls "animateTitle" function on mount', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    wrapper = mount(StartAnimation, {
      global: {
        plugins: [store]
      },
      methods: {
        animateTitle
      }
    });
    animateTitle();

    expect(animateTitle).toBeCalled();

    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });
});
