# Kotitehtävä: React-sijoituslaskuri

Tässä tehtävässä rakennat Reactilla sijoituslaskurin. Harjoituksen tavoitteena on kerrata Reactin perusteita: komponentit, propsit, `useState`, kontrolloidut inputit, tapahtumankäsittely, taulukon renderöinti `.map()`-metodilla ja datan välittäminen kuvaajakomponentille.



## Ennen aloittamista

Asenna riippuvuudet ja käynnistä sovellus:

```bash
npm install
npm run dev
```

Aja testit erillisessä terminaalissa:

```bash
npm test
```

Starterissa testien kuuluukin aluksi epäonnistua. Älä muokkaa `tests/`-hakemiston tiedostoja tai `.github/workflows/autograding.yml`-tiedostoa.

## Sovelluksen toiminta

Käyttäjä syöttää:

- alkupääoman euroina
- kuukausisäästön euroina
- vuosituoton prosentteina, esimerkiksi `7`
- sijoitusajan vuosina

Sekä alkupääoma että kuukausisäästö voivat olla käytössä samaan aikaan. Toisen niistä voi myös asettaa nollaksi.

Laskennan jälkeen sovellus näyttää jokaiselta vuodelta:

1. vuoden numeron
2. kumulatiivisesti sijoitetun summan
3. sijoituksista syntyneen tuoton
4. sijoituksen kokonaisarvon vuoden lopussa

Samat tiedot esitetään myös viivakuvaajana.

## Laskentakaava

Tässä harjoituksessa kuukausisäästö yksinkertaistetaan vuoden aikana tehtäväksi lisäykseksi:

```text
vuoden lisäys = kuukausisäästö * 12
vuoden loppusumma = (edellisen vuoden loppusumma + vuoden lisäys) * (1 + vuosituotto / 100)
```

Ensimmäisen vuoden alussa `edellisen vuoden loppusumma` tarkoittaa alkupääomaa.

Esimerkki:

```text
alkupääoma = 1000
kuukausisäästö = 100
vuosituotto = 7 %

vuoden lisäys = 100 * 12 = 1200
1. vuoden loppusumma = (1000 + 1200) * 1.07 = 2354
```

Kumulatiivisesti sijoitettu summa vuoden `n` lopussa on:

```text
alkupääoma + (kuukausisäästö * 12 * n)
```

Tuotto on:

```text
kokonaisarvo - sijoitettu summa
```

Älä pyöristä laskentaa vuosien välissä. Pyöristä vain käyttöliittymässä näytettävät arvot.

## Tehtävä 1: toteuta laskentafunktio

Avaa `src/utils/calculateInvestment.js` ja toteuta `calculateInvestment`.

Funktion tulee palauttaa taulukko, jonka jokainen alkio on muotoa:

```js
{
  year: 1,
  invested: 2200,
  returns: 154,
  total: 2354
}
```

Funktion tulee toimia myös silloin, kun vuosituotto on `0` tai toinen sijoitussummista on `0`.

## Tehtävä 2: kontrolloidut inputit

Avaa `src/App.jsx`.

Toteuta `handleInputChange` niin, että lomakkeen neljä kenttää päivittävät `formValues`-tilaa.

Vinkki: inputin `name` kertoo, mikä property pitää päivittää. Tee uusi olio spread-syntaksilla; älä muokkaa olemassa olevaa state-oliota suoraan.

## Tehtävä 3: laskenta napista

Toteuta `handleCalculate` tiedostossa `src/App.jsx`.

- estä lomakkeen oletustoiminto
- kutsu `calculateInvestment(formValues)`
- tallenna palautettu taulukko `results`-tilaan

Sovelluksen tulee päivittyä ilman sivun uudelleenlatausta.

## Tehtävä 4: tulostaulukko

Avaa `src/components/ResultsTable.jsx`.

Renderöi yksi `<tr>` jokaista `results`-taulukon alkiota kohti. Käytä `.map()`-metodia ja anna jokaiselle riville sopiva `key`.

Taulukossa tulee olla sarakkeet:

- Vuosi
- Sijoitettu
- Tuotto
- Yhteensä

Saat käyttää valmista `formatEuro`-funktiota.

## Tehtävä 5: kuvaaja Rechartsilla

Starterissa on valmis `ExampleChart`-komponentti, joka näyttää miten Recharts-kirjastoa käytetään. Tutki tiedostoa `src/components/ExampleChart.jsx` ja Rechartsin dokumentaatiota:

https://recharts.github.io/guide/getting-started/

Toteuta `src/components/InvestmentChart.jsx` siten, että:

- komponentti saa `results`-taulukon propsina
- kuvaajan x-akseli käyttää `year`-kenttää
- kuvaajassa on kolme `Line`-komponenttia
- viivojen `dataKey`-arvot ovat `invested`, `returns` ja `total`
- käytät legendaa ja tooltipia

Älä kopioi `exampleData`-taulukkoa varsinaiseen kuvaajaan. Varsinaisen kuvaajan data tulee aina propsina.

## Valmiin tehtävän tarkistuslista

- `npm test` menee läpi
- neljä inputtia ovat kontrolloituja
- laskenta käyttää annettua vuosikaavaa
- tuloksia syntyy yhtä monta kuin sijoitusvuosia
- tulostaulukko näyttää kaikki vuodet
- kuvaaja saa saman `results`-datan kuin taulukko
- statea ei mutatoida suoraan
- tehtävässä ei ole custom hookeja tai muita tällä kurssitasolla kiellettyjä React-rakenteita

## Palautus

Commitoi ja pushaa muutokset omaan Classroom50-repositorioosi. Automaattiset testit ajetaan jokaisen pushin yhteydessä GitHub Actionsissa.
