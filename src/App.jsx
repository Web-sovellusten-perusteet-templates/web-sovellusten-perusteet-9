import { useState } from 'react'
import InvestmentForm from './components/InvestmentForm.jsx'
import ResultsTable from './components/ResultsTable.jsx'
import InvestmentChart from './components/InvestmentChart.jsx'
import ExampleChart from './components/ExampleChart.jsx'
import { calculateInvestment } from './utils/calculateInvestment.js'

const initialFormValues = {
  initialInvestment: '1000',
  monthlyContribution: '100',
  yearlyReturn: '7',
  years: '10',
}

export default function App() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [results, setResults] = useState([])

  function handleInputChange(event) {
    // TODO 1: Päivitä formValues-state inputin name- ja value-arvojen avulla.
    // Muista tehdä uusi olio. Älä muokkaa statea suoraan.
  }

  function handleCalculate(event) {
    event.preventDefault()
    // TODO 2: Kutsu calculateInvestment(formValues) ja tallenna tulos results-stateen.
  }

  return (
    <main className="page">
      <header>
        <h1>Sijoituslaskuri</h1>
        <p>Harjoitus: state, kontrolloidut inputit, propsit, komponentit ja listojen renderöinti.</p>
      </header>

      <section className="panel">
        <h2>Laskurin tiedot</h2>
        <InvestmentForm
          values={formValues}
          onChange={handleInputChange}
          onSubmit={handleCalculate}
        />
      </section>

      {results.length > 0 ? (
        <>
          <section className="panel">
            <h2>Vuosittaiset tulokset</h2>
            <ResultsTable results={results} />
          </section>

          <section className="panel">
            <h2>Sijoituksen kehitys</h2>
            <InvestmentChart results={results} />
          </section>
        </>
      ) : (
        <section className="panel hint" aria-live="polite">
          Syötä arvot ja paina Laske.
        </section>
      )}

      <section className="panel">
        <h2>Recharts-esimerkki</h2>
        <p className="hint">
          Tämä kuvaaja on starterissa esimerkkinä. Käytä samaa rakennetta oman InvestmentChart-komponentin toteutuksessa.
        </p>
        <ExampleChart />
      </section>
    </main>
  )
}
