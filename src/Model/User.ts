class User {
    constructor(    
        private _id:string,
        private _nome:string,
        private _email:string,
        private _senha:string){}
    
    public get id(): string{
        return this._id;
    }
    public set id(value: string){
        this._id = value
    }

    public get nome(): string{
        return this._nome;
    }
    public set nome(value: string){
        this._nome = value
    }

    public get email(): string{
        return this._email;
    }
    public set email(value: string){
        this._email = value
    }

    public get senha(): string{
        return this._senha;
    }
    public set senha(value: string){
        this._senha = value
    }
}
