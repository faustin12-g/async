async function fetchUserTodos()
{
    const urls = [
        'https://jsonplaceholder.typicode.com/users',
        'https://jsonplaceholder.typicode.com/todos',
    ]
    try{
        const [user, todos] = await Promise.all(urls.map(url=>fetch(url)))
        if(!user.ok) throw new Error('OOPS! User fetch failed: ' + user.status);
        if(!todos.ok) throw new Error('OOPS! Todos fetch failed: ' + todos.status);
        const userData = await user.json();
        const todosData = await todos.json();
        
        for(const u of userData)
        {
            return {
                userId: u.id,
                name: u.name,
                todos: todosData.filter(t=>t.userId === u.id)
            }
        }
    

    }
    catch(error)
    {
        console.error('Error fetching data: ', error.message);
    }

}

fetchUserTodos().then(console.log).catch(console.log);