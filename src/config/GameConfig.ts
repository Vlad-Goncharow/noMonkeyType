import { faA, faClock, IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface typesArrayObjectType{
  type:'time' | 'words',
  icon:IconDefinition
}

export const typesArray:typesArrayObjectType[] = [
  {
    type:'time',
    icon:faClock
  },
  {
    type:'words',
    icon:faA
  }
];
export const timesArray: Array<15 | 30 | 60 | 120> = [15,30,60,120]
export const wordsArray: Array<10 | 25 | 50 | 100> = [10,25,50,100]
