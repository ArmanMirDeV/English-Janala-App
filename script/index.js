const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")// promise of response 
        .then(res => res.json()) // promise of json data
        .then(json => displayLessons(json.data));
}

const removeActive = ()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove("active"));

}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn);

            clickBtn.classList.add("active")

            displayLevelWord(data.data);

        })
};

const loadWordDetail = async(id) =>{
    const url=` https://openapi.programming-hero.com/api/word/${id}`;;
    const res = await fetch(url);
    const details= await res.json();
    displayWordDetails(details.data)


} ;
const displayWordDetails = (word) =>{
    console.log(word)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="">
                <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
            </div>
            <div class="">
                <h2 class=" font-bold">Meaning</h2>
                <p>${word.meaning}</p>
            </div>
            <div class="">
                <h2 class=" font-bold">Example</h2>
                <p>
                ${word.sentence}</p>
            </div>
            <div class="">
                <h2 class=" font-bold">Synonims</h2>
               <span class="btn">SYnl</span>
               <span class="btn">SYnl</span>
               <span class="btn">SYnl</span>
               <span class="btn">SYnl</span>
            </div>
        </div>
        <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>


    `;
    document.getElementById("word_modal").showModal();

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    
    if(words.length == 0){
        wordContainer.innerHTML = `
         <div class="text-center col-span-full rounded-xl py-10 ">
         <img class="mx-auto " src="./assets/alert-error.png"/> 
            <p class="text-xl font-medium text-gray-400 mt-5 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl mt-5 ">নেক্সট Lesson এ যান</h2>
        </div>

        `;
        return;
    }


    /*   {
      "id": 82,
      "level": 1,
      "word": "Car",
      "meaning": "গাড়ি",
      "pronunciation": "কার"
  }
   */

    words.forEach(word => {

        const card = document.createElement("div");
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5  space-y-4">
            <h2 class="font-bold text-2xl ">${word.word ? word.word : " শব্দ পাওয়া যায় নি " }</h2>
            <p class="font-semibold ">${word.meaning? word.meaning:"অর্থ পাওয়া যায় নি"} / ${word.pronunciation? word.pronunciation:"pronunciation পাওয়া যায় নি"}</p>

            <div class="text-2xl font-medium font-bangla">
                "আগ্রহী / ইগার"
            </div>
            <div class="flex justify-between items-center ">
                <button onclick="loadWordDetail(${word.id})"  class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>



        </div>
        `;
        wordContainer.append(card)
    })
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
        <button id="lesson-btn-${(lesson.level_no)}" onclick="loadLevelWord(${(lesson.level_no)})"  class="btn btn-outline btn-primary lesson-btn"> <i class="fa-solid fa-book-open"></i>
        Lesson - ${lesson.level_no} </button>
        
        `;



        // 4. append into container 

        levelContainer.append(btnDiv);
    }


};
loadLessons()