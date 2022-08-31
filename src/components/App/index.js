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
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  componentDidMount() {
    console.log('ComponentDidMount : le composant a été rendu pour la premiere fois.');
    document.title = `Convert euro to ${this.state.selectedCurrency}`;
  }

  componentDidUpdate(prevProps, prevState) {
    // avec prevProps et prevState je peux comparer les anciens props / state
    // et determiner qu'est-ce qui précisément changé
    if (prevState.selectedCurrency !== this.state.selectedCurrency) {
      // et du coup je modifie mon titre que lorsque c'est nécessaire
      console.log('didUpdate : mise a jour du titre de la page');
      document.title = `Conversion de euros vers ${this.state.selectedCurrency}`;
    }
  }

   // une méthode appellée au clic sur le bouton
  handleButtonClick() {
    this.setState({
      isListOpen: !this.state.isListOpen,
    });
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
          <Toggler
          isOpen={this.state.isListOpen}
          onToggle={this.handleButtonClick}
        />
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
