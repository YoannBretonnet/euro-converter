/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
// == Import
import Header from 'src/components/Header';
import Toggler from 'src/components/Toggler';
import Currencies from 'src/components/Currencies';
import Result from 'src/components/Result';

// import du fichier scss
import './app.scss';

// import de mes données statiques
import currencyData from 'src/data/currencies';

class App extends React.Component {

  constructor(props) {
    super(props);
  
    // je déclare l'état
    this.state = {
      isListOpen: true,
      // le montant a convertir
      baseAmount: 1,
      // la devise cible selectionnée
      selectedCurrency: 'Swiss Franc',
      // le champ de recherche de devise
      inputSearch: '',
    };

    // j'utilise la méthode bind pour ne pas perdre la valeur de this
    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

    // une fonction appellée lors du clic sur une devise
  // la fonction recoit en parametre la nouvelle devise selectionnée
  handleCurrencyClick(newCurrency) {
    this.setState({
      selectedCurrency: newCurrency,
    });
  }

  handleBaseAmountChange(event) {
    this.setState({
      baseAmount: event.target.valueAsNumber,
    });
  }

  handleSearchInputChange(event) {
    this.setState({
      inputSearch: event.target.value,
    });
  }

  
  getFilteredCurrencies() {
    // si inputSearch est vide
    if (this.state.inputSearch === '') {
      // je renvoie toutes les devises telle qu'elles
      return currencyData;
    }
    // si inputSearch contient quelque chose
    // je garde que les devises dont le nom contient le prédicat de recherche
    return currencyData
      // eslint-disable-next-line max-len
      .filter((currency) => currency.name.toLowerCase().includes(this.state.inputSearch.toLowerCase()));
  }

    // fonction qui va calculer le montant converti
    makeConversion() {
        const foundCurrency = currencyData
        .find((currency) => currency.name === this.state.selectedCurrency);

      const resultFloat = foundCurrency.rate * this.state.baseAmount;
  
      // je veux que deux décimales après la virgule
      const resultFixed = Math.round(resultFloat * 100) / 100;
  
      return resultFixed;
    }

  render() {
    return (
      <div className="app">
        <Header
          baseAmount={this.state.baseAmount}
          onBaseAmountChange={this.handleBaseAmountChange}
        />
        {/* un composant pour activer/désactiver la liste */}
        <Currencies
          isOpen={this.state.isListOpen}
          list={this.getFilteredCurrencies()}
          inputSearchValue={this.state.inputSearch}
          onCurrencyClick={this.handleCurrencyClick}
          onInputSearchChange={this.handleSearchInputChange}
        />
        <Result
          result={this.makeConversion()}
          selectedCurrency={this.state.selectedCurrency}
        />
      </div>
    );
  }
}

// == Export
export default App;
