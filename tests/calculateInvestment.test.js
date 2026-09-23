import { describe, expect, it } from 'vitest'
import { calculateInvestment } from '../src/utils/calculateInvestment.js'

const baseInput = {
  initialInvestment: 1000,
  monthlyContribution: 100,
  yearlyReturn: 7,
  years: 3,
}

describe('calculateInvestment', () => {
  it('palauttaa yhden tulosolion jokaista vuotta kohti', () => {
    const results = calculateInvestment(baseInput)
    expect(results).toHaveLength(3)
    expect(results[0]).toMatchObject({ year: 1 })
    expect(results[2]).toMatchObject({ year: 3 })
  })

  it('laskee ensimmäisen vuoden annetulla kaavalla', () => {
    const [year1] = calculateInvestment(baseInput)
    expect(year1.total).toBeCloseTo(2354, 6)
  })

  it('käyttää edellisen vuoden loppusummaa seuraavan vuoden pohjana', () => {
    const results = calculateInvestment(baseInput)
    expect(results[1].total).toBeCloseTo(3802.78, 6)
  })

  it('laskee sijoitetun summan ilman tuottoa', () => {
    const results = calculateInvestment(baseInput)
    expect(results[0].invested).toBeCloseTo(2200, 6)
    expect(results[2].invested).toBeCloseTo(4600, 6)
  })

  it('laskee tuoton kokonaisarvon ja sijoitetun summan erotuksena', () => {
    const [year1] = calculateInvestment(baseInput)
    expect(year1.returns).toBeCloseTo(154, 6)
  })

  it('toimii myös nollan prosentin tuotolla', () => {
    const results = calculateInvestment({
      initialInvestment: 500,
      monthlyContribution: 50,
      yearlyReturn: 0,
      years: 2,
    })
    expect(results[1].total).toBeCloseTo(1700, 6)
    expect(results[1].returns).toBeCloseTo(0, 6)
  })
})
