const createElements = (arr) => {
    const htmElements = arr.map(el =>`<span class="btn">${el} </span>`);
    console.log(htmElements.join(" "));

};

const synonyms = ["hello", "hi", "konnichiwa"]
createElements(synonyms);