export class Custom {
  readonly p: any;
  constructor(p: any) {
    this.p = p;
  }
}

export const getCustomOptions = () => ({
  types: {
    Custom: {
      serifier: (u: Custom) => u.p,
      deserifier: (s: any) => new Custom(s),
    },
  },
});
