export default class User {
  constructor(
    private _id: string,
    private _titulo: string,
    private _descricao: string,
    private _status: boolean,
    private _userId: string
  ) {}

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get titulo(): string {
    return this._titulo;
  }
  public set titulo(value: string) {
    this._titulo = value;
  }

  public get descricao(): string {
    return this._descricao;
  }
  public set descricao(value: string) {
    this._descricao = value;
  }

  public get status(): boolean {
    return this._status;
  }
  public set status(value: boolean) {
    this._status = value;
  }

  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }
}
