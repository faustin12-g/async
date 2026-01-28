async function getPosts()
{
    const controller = new AbortController();
    const {signal } = controller;
    const urls = [
            'https://dummyjson.com/posts',
            'https://this-may-not-exist.com/posts',
            'https://jsonplaceholder.typicode.com/posts',
    ]
    try {
        const response = await Promise.any([
            ...urls.map(url=>fetch(url, {signal}))
        ])
        if(!response.ok) throw new Error('HTTP Error: ' + response.status);
        const data = await response.json();
        return data;
    }
    catch(error)
    {
        console.error('All fetch attempts failed:', error);
    }
    finally{
        console.log('All fetch attempts finished.')
        // controller.abort();
    }
}

getPosts().then(console.log).catch(console.log);