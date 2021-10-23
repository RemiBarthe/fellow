import { shallowMount } from '@vue/test-utils';
import Login from '@/containers/Login.vue';
import FellowTitle from '@/components/FellowTitle.vue';
import Button from '@/components/Button.vue';

describe('Login.vue', () => {
  const wrapper = shallowMount(Login);

  it('renders FellowTitle component', () => {
    const fellowTitle = wrapper.findComponent(FellowTitle);
    expect(fellowTitle.exists()).toBe(true);
  });

  it('renders Button component', () => {
    const googleButton = wrapper.findAllComponents(Button).at(0);
    expect(googleButton.exists()).toBeTruthy();
    expect(googleButton.classes()).toContain('bg-black');

    const facebookButton = wrapper.findAllComponents(Button).at(1);
    expect(facebookButton.exists()).toBeTruthy();
    expect(facebookButton.classes()).toContain('bg-primary');
  });

  it('calls googleSignIn on click on google button', async () => {
    const mockGoogleSignIn = jest.spyOn(Login.methods, 'googleSignIn');
    await shallowMount(Login)
      .findAllComponents(Button)
      .at(0)
      .trigger('click');
    expect(mockGoogleSignIn).toHaveBeenCalled();
  });

  it('calls facebookSignIn on click on facebook button', async () => {
    const mockFacebookSignIn = jest.spyOn(Login.methods, 'facebookSignIn');
    await shallowMount(Login)
      .findAllComponents(Button)
      .at(1)
      .trigger('click');
    expect(mockFacebookSignIn).toHaveBeenCalled();
  });
});
