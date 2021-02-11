import assert from 'assert';
import { Given, When, Then, Before } from '@cucumber/cucumber';
import { mount } from '@vue/test-utils';
import Hello from '~/components/Hello.vue';

Before(function () {
    this.wrapper = mount(Hello);
});

When('I click button', async function () {
    const button = this.wrapper.find('button');
    await button.trigger('click');
  });

Then('I see {string} message', function (string) {
    const text = this.wrapper.find('.message').text();
    assert.strictEqual(text, 'Hello');
});