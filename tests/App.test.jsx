import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import ResultsTable from '../src/components/ResultsTable.jsx'
import InvestmentChart from '../src/components/InvestmentChart.jsx'

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  LineChart: ({ children, data }) => (
    <div data-testid="recharts-line-chart" data-points={data?.length ?? 0}>
      {children}
    </div>
  ),
  CartesianGrid: () => null,
  Legend: () => null,
  Line: ({ dataKey }) => <span data-testid={`line-${dataKey}`} />,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null,
}))

const sampleResults = [
  { year: 1, invested: 2200, returns: 154, total: 2354 },
  { year: 2, invested: 3400, returns: 402.78, total: 3802.78 },
]

describe('Sijoituslaskuri', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderöi otsikon ja laskentapainikkeen', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /sijoituslaskuri/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /laske/i })).toBeInTheDocument()
  })

  it('renderöi kaikki neljä syötettä', () => {
    render(<App />)
    expect(screen.getByLabelText(/alkupääoma/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/kuukausisäästö/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/vuosituotto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/sijoitusaika/i)).toBeInTheDocument()
  })

  it('päivittää kontrolloidun inputin stateen', () => {
    render(<App />)
    const input = screen.getByLabelText(/alkupääoma/i)
    fireEvent.change(input, { target: { value: '2500' } })
    expect(input).toHaveValue(2500)
  })

  it('Laske-painike tuottaa oikean määrän tulosrivejä', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText(/sijoitusaika/i), { target: { value: '3' } })
    fireEvent.click(screen.getByRole('button', { name: /laske/i }))

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row')
    expect(rows).toHaveLength(4)
  })
})

describe('ResultsTable', () => {
  it('renderöi jokaisen propsina saadun tuloksen omalle rivilleen', () => {
    render(<ResultsTable results={sampleResults} />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})

describe('InvestmentChart', () => {
  it('antaa tulosdatan Recharts LineChart -komponentille', () => {
    render(<InvestmentChart results={sampleResults} />)
    const chart = screen.getByTestId('recharts-line-chart')
    expect(chart).toHaveAttribute('data-points', '2')
    expect(screen.getByTestId('line-invested')).toBeInTheDocument()
    expect(screen.getByTestId('line-returns')).toBeInTheDocument()
    expect(screen.getByTestId('line-total')).toBeInTheDocument()
  })
})
