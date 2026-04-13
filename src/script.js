const bookmarks_list_el = document.getElementById("bookmarks_list_el")
const add_btn = document.getElementById("add_btn")
const reset_all = document.getElementById("reset_all")
const bookmark_form = document.getElementById("bookmark_form")
const bookmark_name_el = document.getElementById("bookmark_name_el")
const bookmark_url_el = document.getElementById("bookmark_url_el")
const template_item = document.getElementById("template_id")

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []

add_btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("add button");  

    let bookmark_name = bookmark_name_el.value.trim()
    let bookmark_url = bookmark_url_el.value.trim()

    bookmarks.push({
        bookmark_name,
        bookmark_url
    })

    console.log("pushed");

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    console.log("storage set");

    updateBookmarks()
})

reset_all.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    console.log("all cleared");
    updateBookmarks()
})


function updateBookmarks() {
    console.log("update fn here..");

    bookmarks_list_el.innerHTML = ""
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
    // console.log("for each inside update");

    bookmarks.forEach(bookmark => {
        const li = generateBookmark(bookmark)
        bookmarks_list_el.appendChild(li)
        console.log("appended");

    });
    bookmark_form.reset()
}

function generateBookmark(bookmark) {
    const bookmark_item = template_item.content.cloneNode(true)

    console.log("This is clone of the template", bookmark_item);

    const anchor = bookmark_item.querySelector("a")
    console.log(anchor);
    
    console.log(anchor.textContent,"before");
    anchor.textContent = bookmark.bookmark_name
    console.log(anchor.textContent,"after");
    
    anchor.href = bookmark.bookmark_url

    console.log("returned");
    console.log(bookmark_item.querySelector("li"));
    
    return bookmark_item
}

function remove_bookmark(e, button) {
    e.preventDefault()
    e.stopPropagation()

    const parent = button.closest("li")
    parent_name = parent.querySelector("a").textContent
    parent.remove()

    let new_array_after_removal = bookmarks.filter((bookmark) => {
        bookmark.name != parent_name
    })
    localStorage.setItem("bookmarks", JSON.stringify(new_array_after_removal))
    updateBookmarks()
}

function redirection(e,li) {
    e.preventDefault()
    let link = li.querySelector("a").href
    // window.location.href = link
    window.open(link,"_blank")
}
updateBookmarks()