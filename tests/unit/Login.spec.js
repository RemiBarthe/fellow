import { shallowMount } from '@vue/test-utils';
import Login from '@/containers/Login.vue';

describe('Login.vue', () => {
  it('renders msg when passed using slot', () => {
    const wrapper = shallowMount(Login, {});
    expect(wrapper.toBe(true));
  });
});
