import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders sort dropdown', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sort By/i);
  expect(linkElement).toBeInTheDocument();
});

test('Simulating select for sort', () => {
  const { getByTestId, getAllByTestId } = render(<App />);
  fireEvent.change(getByTestId('select'), { target: { value: 2 } })
  let options = getAllByTestId('select-option')
  expect(options[0].selected).toBeTruthy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeFalsy();
});

test('Simulating input for filter', () => {
  const { getByText, getByPlaceholderText, container, getByTestId, getAllByTestId } = render(<App />);
  getByPlaceholderText('Filter by office').value = 'Leeds';
});
