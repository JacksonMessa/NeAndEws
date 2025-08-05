import { News } from "./news.type"

export type NewsGetResponse = {
    message: string,
    newsFound: number,
    pagesFound: number,
    news: News[]  
}