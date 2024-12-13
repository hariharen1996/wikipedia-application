import { PAGES } from "./config.js";


const paginate = (data) => {
    let page = PAGES;
    let totalNoPages = Math.ceil(data.length / page)
    console.log(totalNoPages)

    let updatedWikipedia = Array.from({length: totalNoPages},(_,index) => {
        const start = index * page
        console.log(start)
        return data.slice(start,start + page)
    })

    return updatedWikipedia
}

export default paginate