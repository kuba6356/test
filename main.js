const mangi = []
const ToHellWithBeingASaintImADoctor = {
    name: "To Hell With Being A Saint, I’m A Doctor/",
    start: 110,
    end: 114
}
mangi.push(ToHellWithBeingASaintImADoctor)
const manga2 ={
    name: 'Happy Massacre Ending/',
    start: 1,
    end: 55
}
const manga3 = {
    name: "A retourner's magic should be special/",
    start: 1,
    end: 176
}
let longestPage = 130
mangi.push(manga2)
mangi.push(manga3)
const chapter = document.querySelector("#chapter")
const body = document.querySelector("body")

async function renderChapter(mangaName, mangaChapter){
    //brak możliwości zczytania ilości plików bez node js'a w związku z tym próbójemy wygenerować strony rozdziału aż nie będzie ona istnaiała.
    for(let x = 1; x <longestPage; x++){
        if(x<10){x = `0${x}`}
        let errorJPG = false
        let errorWEBP = false
        try{
            const response = await fetch(`mangi/${mangaName}${mangaChapter}${x}.jpg`);
            const data = await response;
            let img = document.createElement("img")
            img.setAttribute("src", `${data.url}`)
            img.setAttribute("onerror", "this.remove()")
            chapter.append(img)
        }
        catch(err){
        }
        try{
            const response = await fetch(`mangi/${mangaName}${mangaChapter}${x}.webp`);
            const data = await response;
            let img = document.createElement("img")
            img.setAttribute("src", `${data.url}`) 
            img.setAttribute("onerror", "this.remove()")
            chapter.append(img)
        }
        catch(err){
        }
        try{
            const response = await fetch(`mangi/${mangaName}${mangaChapter}${x}.png`);
            const data = await response;
            let img = document.createElement("img")
            img.setAttribute("src", `${data.url}`) 
            img.setAttribute("onerror", "this.remove()")
            chapter.append(img)
        }
        catch(err){
        }
    }
}



const selector = document.querySelector("#manga")
const header = document.querySelector("header")
selector.addEventListener("change", (e) =>{
    const value = e.target.value
    mangi.forEach(element => {
        if(element.name == value){
            if(document.querySelector("#chapterSelector") != undefined){ document.querySelector("#chapterSelector").remove()}
            const chapterSelector = document.createElement("select")
            chapterSelector.setAttribute("id", "chapterSelector")
            header.append(chapterSelector)
            for(let x = element.start; x<= element.end; x++){
                let option = document.createElement("option")
                option.setAttribute("value", `Chapter ${x}/`)
                option.textContent = x
                chapterSelector.append(option)
            }
            chapterSelector.addEventListener("change", (e) =>{
                while(chapter.childElementCount != 0){
                    chapter.firstChild.remove()
                }
                renderChapter(value, e.target.value)
            })
        }
    });
})
