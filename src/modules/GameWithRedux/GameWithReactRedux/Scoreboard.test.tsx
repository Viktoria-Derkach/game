import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';

import { store } from '@/store';

import { Scoreboard } from './Scoreboard';
jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@/hooks/useQuery', () => ({
  __esModule: true,
  useQuery: () => ({ get: () => null }),
}));

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

// (useQuery as jest.Mock).mockReturnValue({ get: () => null });

describe('Scoreboard test cases', () => {
  it('Scoreboard check', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockReturnValue({
      level: 'beginner',
      time: 0,
      bombs: 10,
      flagCounter: 3,
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Scoreboard />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
    expect(mockHistoryPush).toHaveBeenCalledWith({
      search: `?${new URLSearchParams({ level: 'intermediate' }).toString()}`,
    });
    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getByRole('button'));
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
