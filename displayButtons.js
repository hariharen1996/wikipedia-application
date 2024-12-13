
const paginationBtn = (element,data,index) => {
    let btnEl = data.map((_,page) => {
        return `<button class="pagination-btn ${index === page ? "bg-dark" : ""} btn btn-primary m-1" data-page="${page}">${page + 1}</button>`
    })

    btnEl.push(`<button class="next-btn btn btn-primary" data-page="${index+1}">next</button>`)
    btnEl.unshift(`<button class="prev-btn btn btn-primary" data-page="${index-1}">prev</button>`)
    
    element.innerHTML = btnEl.join('')
}

export default paginationBtn