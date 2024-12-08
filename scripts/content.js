let articleUrls = []

async function getPosts() {
    const tossResponse = await fetch(
        'https://api-public.toss.im/api-public/v3/ipd-thor/api/v1/workspaces/15/posts?size=5&categoriesSlug=tech',
        {
            method: 'GET',
        }
    )
    const toss = await tossResponse.json()
    const posts = toss.success.results.map((post, index) => {
        articleUrls.push(`https://toss.tech/article/${post.seoConfig.urlSlug}`)

        return `<li><a id="toss${index}"><h3>${post.title}</h3></a>
        <p>${post.subtitle}</p></li>`
    })

    return posts.join('')
}

getPosts().then((posts) => {
    document.querySelector('#posts').innerHTML = `<ul>${posts}</ul>`

    for (let i = 0; i < articleUrls.length; i++) {
        const onClick = () => {
            chrome.tabs.create({ url: articleUrls[i] })
        }
        const a = document.getElementById(`toss${i}`)
        a.addEventListener('click', onClick)
    }
})
