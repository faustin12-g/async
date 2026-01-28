async function getUsers(timeout = 5000)
{
    const controller = new AbortController();
    const {signal}  = controller;
    const timeoutId = new Promise((_, reject)=>{
        setTimeout(()=>{
            reject(new Error('Request timed out'));
        }, timeout)
    })

    try{
        const response = await Promise.race([fetch('https://jsonplaceholder.typicode.com/users', {signal}), timeoutId]);
        if(response instanceof Error) throw response;
        if(!response.ok) return new Error('HTTP Error: ', response.status);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error :', error.message);
    }
    finally{
        controller.abort();

    }



}

getUsers().then(console.log).catch(console.log);