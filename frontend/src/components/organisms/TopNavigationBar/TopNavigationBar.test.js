import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TopNavigationBar from './TopNavigationBar';

afterEach(cleanup);

describe('Top NavigationBar', () => {
    test('check if top navigation bar is loaded', () => {
        const { getByText } = render(<TopNavigationBar />);

        expect(getByText('Centralized Communication Command Center')).toBeDefined();
    });
});