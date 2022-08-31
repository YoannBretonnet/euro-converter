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
      // le montant a convertir
      baseAmount: 1,
      // la devise cible selectionnée
      selectedCurrency: 'Swiss Franc',
      // le champ de recherche de devise
      inputSearch: '',
    };

    // j'utilise la méthode bind pour ne pas perdre la valeur de this
    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
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

  render() {
    return (
      <div className="app">
        <Header
          baseAmount={this.state.baseAmount}
          onBaseAmountChange={this.handleBaseAmountChange}
        />
        {/* un composant pour activer/désactiver la liste */}

      </div>
    );
  }
}

// == Export
export default App;
