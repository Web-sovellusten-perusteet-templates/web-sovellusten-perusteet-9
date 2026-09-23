import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const exampleData = [
  { year: 1, amount: 1200 },
  { year: 2, amount: 2550 },
  { year: 3, amount: 4100 },
  { year: 4, amount: 5850 },
]

export default function ExampleChart() {
  return (
    <div className="chart-box">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={exampleData}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            name="Esimerkkisumma"
            stroke="#d97706"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
