/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
// == Import
import Header from 'src/components/Header';
import Toggler from 'src/components/Toggler';
import Currencies from 'src/components/Currencies';
import Result from 'src/components/Result';

// import du fichier scss
import './app.scss';

// import de mes données statiques
import currencyData from 'src/data/currencies';

// import des hooks
import { useState, useEffect } from 'react';

function App (props) {
 
    // je refactorise en utilisant le hook useState
    const [isListOpen, setIsListOpen] = useState(true);
    const [baseAmount, setBaseAmount] = useState(1);
    const [selectedCurrency, setSelectedCurrency] = useState("Swiss Franc");
    const [inputSearch, setInputSearch] = useState('');


  // j'utilise les life cycles pour modifier le title du document
  // avec la refacto, j'utilise le hook useEffect
  useEffect (() => {
    document.title = `Convert euro to ${selectedCurrency}`;
  },[]);

  useEffect (() => {
    document.title = `Conversion de euros vers ${selectedCurrency}`;
  }, [selectedCurrency] );
  
   // une méthode appellée au clic sur le bouton
  const handleButtonClick = () => {
    setIsListOpen(!isListOpen);
  }
  // une fonction appellée lors du clic sur une devise
  // la fonction recoit en parametre la nouvelle devise selectionnée
  const handleCurrencyClick = (newCurrency) => {
    setSelectedCurrency(newCurrency);
    
  };

  const handleBaseAmountChange = (event) => {
    setBaseAmount(event.target.valueAsNumber);
  };

  const handleSearchInputChange = (event) => {
 setInputSearch(event.target.value);
  };

  
  const getFilteredCurrencies = () => {
    // si inputSearch est vide
    if (inputSearch === '') {
      // je renvoie toutes les devises telle qu'elles
      return currencyData;
    }
    // si inputSearch contient quelque chose
    // je garde que les devises dont le nom contient le prédicat de recherche
    return currencyData
      // eslint-disable-next-line max-len
      .filter((currency) => currency.name.toLowerCase().includes(inputSearch.toLowerCase()));
  };

    // fonction qui va calculer le montant converti
    const makeConversion = () => {
      const foundCurrency = currencyData
        .find((currency) => currency.name === selectedCurrency);

      const resultFloat = foundCurrency.rate * baseAmount;
  
      // je veux que deux décimales après la virgule
      const resultFixed = Math.round(resultFloat * 100) / 100;
  
      return resultFixed;
    }

    return (
      <div className="app">
        <Header
          baseAmount={baseAmount}
          onBaseAmountChange={handleBaseAmountChange}
        />
        {/* un composant pour activer/désactiver la liste */}
          <Toggler
          isOpen={isListOpen}
          onToggle={handleButtonClick}
        />
        <Currencies
          isOpen={isListOpen}
          list={getFilteredCurrencies()}
          inputSearchValue={inputSearch}
          onCurrencyClick={handleCurrencyClick}
          onInputSearchChange={handleSearchInputChange}
        />
        <Result
          result={makeConversion()}
          selectedCurrency={selectedCurrency}
        />
      </div>
    );

}

// == Export
export default App;
