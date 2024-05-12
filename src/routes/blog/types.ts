

export type Post = {
    title: string
    status: 'done' | 'in progress' | 'draft'
    slug: string
    description: string
    date: string
    categories: string[]
    published: boolean
}
