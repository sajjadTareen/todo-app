export class Todo {
    constructor(
        public id: number,
        public title: string,
        public desc: string,
        public completed: boolean = false,
        public text: string
    ) {}
}