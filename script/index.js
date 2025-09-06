const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")// promise of response 
        .then(res => res.json()) // promise of json data
        .then(json => displayLessons(json.data));
}

const displayLessons = (lessons) => {

    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";


    // 2. get into everyLesson

    for (let lesson of lessons) {

         // 3. create Element 
        console.log(lesson)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button  class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i>
        Lesson - ${lesson.level_no} </button>
        
        `;

       

        // 4. append into container 

        levelContainer.append(btnDiv);
    }

    x
};
loadLessons()