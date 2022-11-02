const add = (x: number, y: number) => x + y;

const sum = (x: number[]) => x.reduce(add, 0);

export default sum;
