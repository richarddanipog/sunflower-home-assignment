import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import { useAppStore } from '../../store/appStore';

// mock zustand store
vi.mock('../../store/appStore', () => ({
  useAppStore: vi.fn(),
}));

describe('SearchBar', () => {
  const mockSetSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: { name: string }) => {
        if (selector.name === 'getSearch') return '';
        if (selector.name === 'getSetSearch') return mockSetSearch;
        return undefined;
      }
    );
  });

  it('renders search input', () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText('Search by city or country...')
    ).toBeInTheDocument();
  });

  it('updates search value on input change', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search by city or country...');

    fireEvent.change(input, { target: { value: 'London' } });

    expect(mockSetSearch).toHaveBeenCalledWith('London');
  });

  it('shows clear button when there is text', () => {
    (useAppStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: { name: string }) => {
        if (selector.name === 'getSearch') return 'London';
        if (selector.name === 'getSetSearch') return mockSetSearch;
        return undefined;
      }
    );

    render(<SearchBar />);
    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    expect(clearButton).toBeInTheDocument();
  });

  it('clears search when clear button is clicked', async () => {
    (useAppStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: { name: string }) => {
        if (selector.name === 'getSearch') return 'London';
        if (selector.name === 'getSetSearch') return mockSetSearch;
        return undefined;
      }
    );

    render(<SearchBar />);
    const clearButton = screen.getByRole('button', { name: 'Clear search' });

    await userEvent.click(clearButton);

    expect(mockSetSearch).toHaveBeenCalledWith('');
  });
});
