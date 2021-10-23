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

  const wrapper = mount(StartAnimation, {
    global: {
      plugins: [store]
    }
  });

  it('renders the title using data', async () => {
    expect(wrapper.text()).toContain('f .');

    await wrapper.setData({ animatedTitle: 'fellow .' });
    expect(wrapper.text()).toContain('fellow .');
  });

  it('calls store "setStartAnimationOver" action', async () => {
    store.commit('SET_START_ANIMATION_OVER', true);
    expect(store.state.startAnimationOver).toBe(true);
  });
});
