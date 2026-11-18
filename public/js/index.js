

let byDifficulty = document.querySelector("#choose-lang-by-difficulty")
let byPopularity = document.querySelector("#choose-lang-by-popularity")
let graphContent = document.querySelector("#graph-content")

function jsonTableToHtml(json) {
    const table = document.createElement("table")
    const headerRow = document.createElement("tr")

    for (let key in json) {
        const tableHeaderCell = document.createElement("th")
        tableHeaderCell.textContent = key
        headerRow.append(tableHeaderCell)
    }

    table.append(headerRow)

    // Just get the length of the first JSON list
    const rowAmount = json[Object.keys(json)[0]].length

    for (let i = 0; i < rowAmount; i++) {
        const row = document.createElement("tr")
        for (let key in json) {
            const dataCell = document.createElement("td")
            dataCell.textContent = json[key][i]
            row.append(dataCell)
        }
        table.append(row)
    }

    return table
}

async function handleTable(response) {
    const contentType = response.headers.get("Content-Type")

    if (contentType === "application/json") {
        return jsonTableToHtml(await response.json())
        // graphContent.replaceChildren(jsonTableToHtml(await response.json()))
    }
    else if (contentType === "application/html") {
        return new DOMParser().parseFromString(await response.text(), "text/html").body.firstElementChild
    }
}

byDifficulty.addEventListener("click", async () => {
    const response = await fetch("/langs_difficulty")
    graphContent.replaceChildren(await handleTable(response))
})

byPopularity.addEventListener("click", async () => {
    let response = await fetch("/langs_popularity")
    graphContent.replaceChildren(await handleTable(response))
})