declare module "naija-state-local-government" {
  const states: () => string[];
  const lgas: (state: string) => {
    lgas: string[];
    state: string;
    senatorial_districts: string[];
  };

  export { states, lgas };
}
