document.addEventListener("DOMContentLoaded", Main)

let rendertMethod = "none"

const posts = [
    {
        _id: 1,
        _ownerid: 1,
        name: "moshe",
        title: "bread",
        description: "bread",
        mediaType: "image",
        mediaUrl: "../design/images/cat images/DSC_6795.avif",
        createdAt: 1767564832000
    },

    {
        _id: 2,
        _ownerid: 2,
        name: "dana",
        title: "Why does my cat scream at 3AM?",
        description: "Every single night she starts running around and yelling.",
        mediaType: "none",
        mediaUrl: "",
        createdAt: 1775182306000
    },

    {
        _id: 3,
        _ownerid: 3,
        name: "itay",
        title: "Orange cat sleeping",
        description: "Caught him sleeping upside down again.",
        mediaType: "image",
        mediaUrl: "../design/images/cat images/DSC_6822.jpg",
        createdAt: 1773928849000
    },

    {
        _id: 4,
        _ownerid: 1,
        name: "moshe",
        title: "Tiny kitten attack",
        description: "She keeps attacking my shoelaces.",
        mediaType: "video",
        mediaUrl: "../design/videos/cat-video.mp4",
        createdAt: 1772681104000
    },

    {
        _id: 5,
        _ownerid: 2,
        name: "dana",
        title: "Cat food recommendations?",
        description: "Looking for dry food for a picky cat.",
        mediaType: "none",
        mediaUrl: "",
        createdAt: 1770219087000
    },

    {
        _id: 6,
        _ownerid: 3,
        name: "itay",
        title: "Window watcher",
        description: "He sat here for 2 hours watching birds.",
        mediaType: "image",
        mediaUrl: "../design/images/cat images/Sphynx_cat.jpg",
        createdAt: 1771456721000
    },

    {
        _id: 7,
        _ownerid: 1,
        name: "moshe",
        title: "How do I stop scratching?",
        description: "My couch is losing the war.",
        mediaType: "none",
        mediaUrl: "",
        createdAt: 1778841205000
    },

    {
        _id: 8,
        _ownerid: 2,
        name: "dana",
        title: "Zoomies compilation",
        description: "Recorded the evening chaos.",
        mediaType: "video",
        mediaUrl: "../design/videos/zoomies.mp4",
        createdAt: 1776419923000
    },

    {
        _id: 9,
        _ownerid: 3,
        name: "itay",
        title: "Loaf mode activated",
        description: "Perfect loaf formation achieved.",
        mediaType: "image",
        mediaUrl: "../design/images/cat images/Russian_blue_cat.webp",
        createdAt: 1777654108000
    },

    {
        _id: 10,
        _ownerid: 1,
        name: "moshe",
        title: "Is my cat too fluffy?",
        description: "Summer is coming and he looks like a carpet.",
        mediaType: "none",
        mediaUrl: "",
        createdAt: 1768892455000
    }
]

function Main() {
    renderPosts()
}

function renderPosts(list = posts) {
    console.log(list)
    console.log("posts rendered")
    const postsContainer = document.getElementById("posts-container")
    if (list != null) {

        postsContainer.innerHTML = list.map(post => `
            <div class="post-box">
                <div class="post-header">
                           <a href="../htmls/profile.html?id=${post._ownerid}" class="post-user"></a>
                           <div class="post-header-right">
                           <div class="post-date">${getTimeAgo(post.createdAt)}</div>
                           <div class="post-title">${post.title}</div>
                           </div>
                       </div>
                       <div class="post-description">${post.description}</div>
                       ${post.mediaType !== "none"
                         ? `<div class="post-media">
                               ${post.mediaType === "image"
                                 ? `<img class="post-image" src="${post.mediaUrl}" />`
                                 : `<video class="post-video" controls src="${post.mediaUrl}"></video>`
                }
                </div>`: ""}
            <div class="post-footer">footer</div>
            </div>`).
            join("")
    }
}

function getTimeAgo(timestamp) {
    const now = Date.now()
    const diffMs = now - timestamp;

    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) {
        return `${seconds}s ago`
    }

    if (minutes < 60) {
        return `${minutes}m ago`
    }

    if (hours < 24) {
        return `${hours}h ago`
    }

    return `${days}d ago`
}

function alterPosts(value = rendertMethod) {
    let alteredPosts
    if (value === rendertMethod) return

    switch (value) {

        case "new" :
            sortMethod = "new"
            alteredPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt)
            break

        case "old" :
            sortMethod = "old"
            alteredPosts = [...posts].sort((a, b) => a.createdAt - b.createdAt)
            break
            
        case "day" :
            sortMethod = "day"
            alteredPosts = [...posts].filter(post => 
                post.createdAt >= Date.now() - (1000 * 60 * 60 * 24))
            break

        case "week" :
            sortMethod = "week"
            alteredPosts = [...posts].filter(post => 
                post.createdAt >= Date.now() - (1000 * 60 * 60 * 24 * 7))
            break

        case "month" :
            sortMethod = "month"
            alteredPosts = [...posts].filter(post => 
                post.createdAt >= Date.now() - (1000 * 60 * 60 * 24 * 30))
            break
    }
    renderPosts(alteredPosts)
    console.log(`sorted by ${value}`)
}