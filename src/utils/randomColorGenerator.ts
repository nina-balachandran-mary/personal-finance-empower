export const randomColorGenerator = () => {
    const r = randomIntegerGenerator(0, 255)
    const g = randomIntegerGenerator(0, 255)
    const b = randomIntegerGenerator(0, 255)
    return `rgb(${r}, ${g}, ${b})`
}

const randomIntegerGenerator = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}