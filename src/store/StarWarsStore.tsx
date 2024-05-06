import {makeAutoObservable, runInAction} from 'mobx';
import {API_URL} from '@env';
import {Favorite, Person, Planet} from '../types';

class starWarsStore {
  private _personList: Person[] = [];
  private _favoriteList: Favorite[] = [];
  private _allPersonCount: number = 0;
  private _nextPage: any;
  private _previousPage: any;
  constructor() {
    makeAutoObservable(this);
  }

  get allPeopleCount(): number {
    return this._allPersonCount;
  }
  get personList(): Person[] {
    if (this._personList?.length === 0) {
      this.loadPersons();
    }
    return this._personList;
  }

  get favoriteList(): Favorite[] {
    return this._favoriteList;
  }

  get maleFavorite(): Favorite[] {
    return this._favoriteList.filter(favorite => favorite.gender === 'male');
  }
  get femaleFavorite(): Favorite[] {
    return this._favoriteList.filter(favorite => favorite.gender === 'female');
  }
  get otherFavorite(): Favorite[] {
    return this._favoriteList.filter(
      favorite => favorite.gender !== 'male' && favorite.gender !== 'female',
    );
  }

  getGenderFavorite(id: string): Favorite[] {
    return this._favoriteList.filter(favorite => favorite.personUrl === id);
  }

  async getHomeworld(person: Person): Promise<string> {
    if (!person.homeworld) {
      throw new Error('No homeworld URL provided for this person');
    }

    const response = await fetch(person.homeworld);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const planet: Planet = await response.json();
    return planet.name;
  }

  isInFavorites(person: Person): boolean {
    return this._favoriteList.some(
      favorite => favorite.personUrl === person.url,
    );
  }

  handleFavorite(person: Person) {
    if (this.isInFavorites(person)) {
      this._favoriteList = this._favoriteList.filter(
        favorite => favorite.personUrl !== person.url,
      );
    } else {
      this._favoriteList.push({
        personUrl: person.url,
        gender: person.gender,
      });
    }
  }

  resetMales() {
    this._favoriteList = this._favoriteList.filter(
      favorite => favorite.gender !== 'male',
    );
  }

  resetFemales() {
    this._favoriteList = this._favoriteList.filter(
      favorite => favorite.gender !== 'female',
    );
  }

  resetOthers() {
    this._favoriteList = this._favoriteList.filter(
      favorite => favorite.gender === 'male' || favorite.gender === 'female',
    );
  }

  resetToFirstPage() {
    this._nextPage = `${API_URL}people/?page=1`;
    this._previousPage = null;
    fetch(this._nextPage)
      .then(response => (response.status === 200 ? response.json() : null))
      .then(responseJson => {
        runInAction(() => {
          this._personList = responseJson.results;
          this._nextPage = responseJson.next;
          this._previousPage = responseJson.previous;
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  loadNextPage() {
    if (this._nextPage === null) {
      return;
    }
    fetch(this._nextPage)
      .then(response => (response.status === 200 ? response.json() : null))
      .then(responseJson => {
        runInAction(() => {
          this._personList = responseJson.results;
          this._nextPage = responseJson.next;
          this._previousPage = responseJson.previous;
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  loadPreviousPage() {
    if (this._previousPage === null) {
      return;
    }
    fetch(this._previousPage)
      .then(response => (response.status === 200 ? response.json() : null))
      .then(responseJson => {
        runInAction(() => {
          this._personList = responseJson.results;
          this._nextPage = responseJson.next;
          this._previousPage = responseJson.previous;
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  loadPersons() {
    if (API_URL === '') {
      return;
    }
    fetch(API_URL + '/people')
      .then(response => (response.status === 200 ? response.json() : null))
      .then(responseJson => {
        runInAction(() => {
          this._personList = responseJson.results;
          this._allPersonCount = responseJson.count;
          this._nextPage = responseJson.next;
          this._previousPage = responseJson.previous;
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export const StarWarsStore = new starWarsStore();
