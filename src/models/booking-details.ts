interface PersonalDetails extends Record<string, any> {
    name: string | undefined;
    email: string | undefined,
    phone: number | undefined,
}

export class BookingDetails {

    private name: string | null = null;
    private email: string | null = null;
    private phone: string | null = null;
    private comments: string | null = null;
    private cost: number | null = null;

    public setName(name:string): void{
        this.name = name;
    }

    public setEmail(email:string): void {
        this.email = email;
    }

    public setPhone(phone:string): void {
        this.phone = phone;
    }

    public setCost(cost:number): void {
        this.cost = cost;
    }

    public setComment(comments:string): void{
        this.comments = comments;
    }

    public get getName(): string | null {
        return this.name;
    }

    public get getEmail(): string | null {
        return this.email;
    }

    public get getPhone(): string | null {
        return this.phone;
    }

    public get getCost(): number | null {
        return this.cost;
    }

    public get getComment(): string | null {
        return this.comments;
    }




}
