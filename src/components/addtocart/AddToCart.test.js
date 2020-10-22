import { shallow } from 'enzyme';
import React from 'react';
import { AddToCart } from './AddToCart';
import { mount } from 'enzyme';



describe('AddToCart', () => {
    it('should render correctly in "debug" mode', () => {
        const component = mount(<AddToCart products={[{}]} />)
    });
});


describe('Render Button with Item Added if item is already added in the cart', () => {
    const component = mount(<AddToCart products={[{ DeviceName: "device" }]} name={"device"} />)
    const button = component.find('.b').first();
    expect(button.text()).toBe('Item Added');
});

describe('Render Button with Add to cart if item is not added in the cart', () => {
    const component = mount(<AddToCart products={[{ DeviceName: "device" }]} name={"not device"} />)
    const button = component.find('.b').first();
    expect(button.text()).toBe('Add to cart');
});