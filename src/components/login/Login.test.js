import { shallow } from 'enzyme';
import React from 'react';
import { Login } from './Login';
import { mount } from 'enzyme';



describe('Login', () => {
    it('should render correctly in "debug" mode', () => {
        mount(<Login />)
    });
});

describe('Login', () => {
    it('Should not login when incorrect username and correct password', () => {
        const setLoggedIn = jest.spyOn(Login.prototype, 'login');
        const component = mount(<Login userName="a" password="b" />)
        component.find('.user').first().simulate('change', { target: { value: 'incorrect' } });
        component.find('.password').first().simulate('change', { target: { value: 'b' } });;
        component.find('.sign').first().simulate("click");
    });
});

describe('Login', () => {
    it('Should not login when incorrect username and incorrect password', () => {
        const setLoggedIn = jest.spyOn(Login.prototype, 'login');
        const component = mount(<Login userName="a" password="b" />)
        component.find('.user').first().simulate('change', { target: { value: 'incorrect' } });
        component.find('.password').first().simulate('change', { target: { value: 'incorrect' } });;
        component.find('.sign').first().simulate("click");
    });
});

describe('Login', () => {
    it('Should login when correct username and correct password', () => {
        const setLoggedIn = jest.spyOn(Login.prototype, 'login');
        const component = mount(<Login userName="a" password="b" setLoggedIn={() => { }} history={[]} />)
        component.find('.user').first().simulate('change', { target: { value: 'a' } });
        component.find('.password').first().simulate('change', { target: { value: 'b' } });;
        component.find('.sign').first().simulate("click");
        expect(setLoggedIn).toHaveBeenCalled();
    });
});



