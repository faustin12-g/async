async function getPosts()
{
    const controller = new AbortController();
    const { signal } = controller;
    const timeoutId = new Promise((_, reject)=>{
        setTimeout(()=>{
            reject(new Error('Request timed out'));
        }, 5000)
    })

    const urls = [
            'https://dummyjson.com/posts',
            'https://this-may-not-exist.com/posts',
            'https://jsonplaceholder.typicode.com/posts',
    ]

    try{
        const fastest = await Promise.race([
            ...urls.map(url=>fetch(url, {signal})), timeoutId
        ])
        if(fastest instanceof Error)
        {
            throw fastest;
        }
        if(!fastest.ok)
        {
            throw new Error('HTTP Error: ' + fastest.status);
        }
        const data = await fastest.json();
        return data;
    }
    finally{
        controller.abort();
    }
}

getPosts().then(console.log()).catch(console.log);