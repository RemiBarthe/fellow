import { shallowMount } from '@vue/test-utils';
import FellowTitle from '@/components/FellowTitle.vue';

describe('FellowTitle.vue', () => {
  it('renders msg when passed using slot', () => {
    const html = 'fellow<span class="text-primary">.</span>';
    const string = 'fellow.';

    const wrapper = shallowMount(FellowTitle, {
      slots: {
        default: html
      }
    });
    expect(wrapper.text()).toMatch(string);
  });
});
