export class ReferencesCreator {
  private references: Reference[];
  constructor() {
    this.references = [];
  }

  public addReference(name: string, uri: string, description: string) {
    if (!uri || uri.length == 0) return;
    this.references.push({ name, uri, description });
  }

  public getReferences() {
    return this.references;
  }
}

class Reference {
  public name = '';
  public uri = '';
  public description = '';
}
