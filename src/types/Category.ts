export type Category = {
    category_id: string,
    group: string,
    hierarchy: string[]
}

export type Categories = {
    categories: Category[],
    request_id: string
}