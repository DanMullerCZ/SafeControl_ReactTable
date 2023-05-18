export type FrenchNumbers = "un" | "deux" | "trois"

export type Params = "id" | "name" | "description" | "colorIdent"

export type MyObject = {
  id: string;
  name: string;
  description: string;
  colorIdent: FrenchNumbers;
}

export type ColorIdent = {
  ident: FrenchNumbers;
  props: {
      color: string;
  }
}
