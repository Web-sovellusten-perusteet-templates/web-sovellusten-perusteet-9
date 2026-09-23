const euroFormatter = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
})

function formatEuro(value) {
  return euroFormatter.format(value)
}

export default function ResultsTable({ results }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Vuosi</th>
            <th>Sijoitettu</th>
            <th>Tuotto</th>
            <th>Yhteensä</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO 4: Renderöi yksi taulukkorivi jokaista results-alkiota kohti. */}
        </tbody>
      </table>
    </div>
  )
}
