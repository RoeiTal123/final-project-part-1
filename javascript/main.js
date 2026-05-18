document.addEventListener("DOMContentLoaded", Main)

const posts = [{_id: 1, _ownerid: 1, name: "moshe", title: "bread", description: "bread", mediaType: "image", 
                mediaUrl: "../design/images/cat images/DSC_6822.jpg", createdAt: 1778848378000}]

function Main(){
    console.log("bread")
    renderPosts()
}

function renderPosts(){
    console.log(posts)
    console.log("posts rendered")
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = posts.map(post =>`
                    <div class="post-box">
                       <div class="post-header">
                           <a href="../htmls/profile.html?id=${post._ownerid}" class="post-user"></a>
                           <div class="post-title">${post.title}</div>
                       </div>
                       <div class="post-description">${post.description}</div>
                       <div class="post-media">
                       ${post.mediaType === "image"
                        ? `<img class="post-image" src="${post.mediaUrl}" />`
                        : `<video class="post-video" controls src="${post.mediaUrl}"></video>`
                        }
                       </div>
                    </div>`).
                    join("");
}
