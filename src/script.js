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
    updateBookmarks()
})

function updateBookmarks() {
    console.log("update fn here..");

    bookmarks_list_el.innerHTML = ""
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
    console.log("for each inside update");

    bookmarks.forEach(bookmark => {
        const li = generateBookmark(bookmark)
        bookmarks_list_el.appendChild(li)
        console.log("appended");

    });
    bookmark_form.reset()
}

function generateBookmark(bookmark) {
    const bookmark_item = template_item.content.cloneNode(true)
    bookmark_item.querySelector("a").textContent = bookmark.name
    bookmark_item.querySelector("a").href = bookmark.url
    console.log("returned");
    return bookmark_item
}