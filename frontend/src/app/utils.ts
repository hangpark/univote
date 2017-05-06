import { School } from './school';

export function getRanking(school: School, schools: School[], sortBy: string): number {

  return schools.concat().sort((s1, s2) => {
    if (s1[sortBy] < s2[sortBy])
      return 1;
    if (s1[sortBy] > s2[sortBy])
      return -1;
    return 0;
  }).map(s => s[sortBy]).indexOf(school[sortBy]) + 1;

}
