import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('renders msg when passed using slot', () => {
    const msg = 'Se connecter avec Google';
    const wrapper = shallowMount(Button, {
      slots: {
        default: msg
      }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
