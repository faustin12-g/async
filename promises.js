let success = true;
function getUsers()
{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>
        {
            if(success)
            resolve([
                {username: 'john', email:'joohn@gm.co'},
                {username: 'jane', email:'jane@gm.co'},
                {username: 'doe', email:'doe@gm.co'}
            ])
            else
            reject('Error: Something went wrong')
        })
    }, 1000)
}

// getUsers().then((user)=>console.log(user),
// (error)=>console.log(error))

getUsers().then((users)=>{
    console.log(users)
})
.catch((error)=>{
    console.log(error)
})
.finally(()=>{
    console.log('Execution completed')
})