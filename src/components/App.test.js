
import React from 'react';
import { shallow } from 'enzyme';
import App from './App.jsx';



describe('App', () => {
  it("should contain 'I love my dog teddy!'", () => {
    const app = shallow(<App />);
    expect(app.contains('I love my dog teddy!')).toBe(true);
  });
  it("should render 'App' to the page", () => {
    const app = shallow(<App />);
    expect(app.exists()).toBe(true);
  })
});