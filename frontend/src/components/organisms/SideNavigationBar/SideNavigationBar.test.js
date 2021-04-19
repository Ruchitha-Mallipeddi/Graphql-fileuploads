import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SideNavigationBar from './SideNavigationBar';

jest.mock('react-google-login', () => ({
    GoogleLogout: (props) =>  <div onClick={props.onLogoutSuccess}>{'logout'}</div>  
}));

const testLogout = jest.fn()
describe('SideNavigationBar', () => {
    test('check if side nav bar is loaded and logout is working', () => {
        const { getByText } = render(<SideNavigationBar onLogoutSuccess={testLogout} />);
        const logout = getByText("logout");
        fireEvent.click(logout);
        expect(testLogout).toBeCalledTimes(1);
    });
});