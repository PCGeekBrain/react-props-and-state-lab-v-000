import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  updateFilters(type){
    this.setState({
      filters: {
        type: type
      }
    })
  }

  findPets(){
    if (this.state.filters.type !== "all"){
      var query = `?type=${this.state.filters.type}`
    } else {query = ""} //hoising means no additional var
    fetch(`/api/pets${query}`).then((data) => {
      return data.json();
    }).then((data) => {
      this.setState({
        pets: data
      });
    });
  }

  adoptPet(id){
    this.setState({
      adoptedPets: [...this.state.adoptedPets, id]
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters} onChangeType={this.updateFilters.bind(this)} onFindPetsClick={this.findPets.bind(this)}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptedPets={this.state.adoptedPets} onAdoptPet={this.adoptPet.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;