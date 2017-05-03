export class School {
  id: number;
  name: string;
  vote_num: number;
  population: number;

  get vote_rate(): number {

    return this.vote_num / this.population;

  }

  fromJson(json: any): School {
    for (let prop in json)
      this[prop] = json[prop];
    return this;
  }

}
