import { render, screen } from '@testing-library/react';
import { Table, Th, Td } from '@/ui/table';

describe('Table', () => {
  it('renders a table', () => {
    render(
      <Table
        dataTestid='test-table'
      >
        <thead>
          <tr>
            <Th dataTestid='test-th'>Foo</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td dataTestid='test-td'>Bar</Td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(screen.queryByTestId('test-table')).toBeInTheDocument();
    expect(screen.queryByTestId('test-th')).toBeInTheDocument();
    expect(screen.queryByTestId('test-td')).toBeInTheDocument();
  });
});
