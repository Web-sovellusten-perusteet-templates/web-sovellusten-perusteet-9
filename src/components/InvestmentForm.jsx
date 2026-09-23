export default function InvestmentForm({ values, onChange, onSubmit }) {
  return (
    <form className="calculator-form" onSubmit={onSubmit}>
      <label>
        Alkupääoma (€)
        <input
          name="initialInvestment"
          type="number"
          min="0"
          step="100"
          value={values.initialInvestment}
          onChange={onChange}
        />
      </label>

      <label>
        Kuukausisäästö (€)
        <input
          name="monthlyContribution"
          type="number"
          min="0"
          step="10"
          value={values.monthlyContribution}
          onChange={onChange}
        />
      </label>

      <label>
        Vuosituotto (%)
        <input
          name="yearlyReturn"
          type="number"
          step="0.1"
          value={values.yearlyReturn}
          onChange={onChange}
        />
      </label>

      <label>
        Sijoitusaika (vuotta)
        <input
          name="years"
          type="number"
          min="1"
          max="50"
          step="1"
          value={values.years}
          onChange={onChange}
        />
      </label>

      <button type="submit">Laske</button>
    </form>
  )
}
