// async function loadTodo()
// {
//     try{
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//         console.log('Response received:', response.status);
//         if(!response.ok)
//         {
//             throw new Error('HTTP Error: ' + response.status);
//         }
//         return await response.json();
//     }
//     catch(error)
//     {
//         console.error('Error fetching todo:', error.message);
//     }
//     finally{
//         console.log('Fetch attempt finished.')
//     }
// }
// //
// loadTodo()

async function sequential()
{
    console.log('Starting sequential fetches...');
    const a = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(r=>r.json());
    const b = await fetch('https://jsonplaceholder.typicode.com/todos/2').then(r=>r.json());
    console.log('Sequential fetches done: ', a.title, '|', b.title);
}

async function parallel()
{
    console.log('Starting parallel fetches...\n');
    const p1 = fetch('https://jsonplaceholder.typicode.com/todos/1').then(r=>r.json());
    const p2 = fetch('https://jsonplaceholder.typicode.com/todos/2').then(r=>r.json());

    const [a, b] = await Promise.all([p1, p2])
    console.log('Parallel fetches done: ', a.title, '|', b.title);
}

sequential().then(parallel);

