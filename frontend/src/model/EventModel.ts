export type EventModel = {
    id: string,
    title: string,
    description: string,
    start: string,
    end?: string,
    location: string,
    category: string,
    creator: string,
    status: string,
    source: string,
    image?: string,
    imageUrl: string
}