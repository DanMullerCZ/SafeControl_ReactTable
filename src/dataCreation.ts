import { colorIdents } from "./colorIdents";
import { MyObject } from "./types";

function createThousandObjects(): MyObject[] {
  let arr: MyObject[] = [];
  for (let index = 1; index < 1001; index++) {
    const uniqueId: string = createID(index);
    const randomIndex = Math.floor(Math.random() * colorIdents.length);
    const ident = colorIdents[randomIndex].ident;

    let createdObject: MyObject = {
      id: uniqueId,
      name: 'name_placeholder',
      description: 'description_placeholder',
      colorIdent: ident
    }

    arr.push(createdObject);
  }
  return arr;
}

function createID(num: number): string {
  let arr: string[] = num.toString().split("")
  while (arr.length !== 4) {
    arr.unshift("0")
  }
  return arr.join("")
}

export default createThousandObjects