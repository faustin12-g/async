
function getUserById(id, callback)
{
    setTimeout(()=>{
        if(id<=0)
        {
            callback(new Error('Invalid id'), null)
        }
        else{
            callback(null, {id: id, name: 'Faustin'})
        }
    }, 1000)
}


getUserById(0, function(error, user)
{
    if(error)
    {
        console.log('Error: ', error.message)
    }
    else
    {
        console.log('User:', user)
    }
})



function pr(id)
{
    return new Promise((resolve, reject)=>{
        getUserById(id, (error, user)=>{
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(user)
            }

        })

    })
}

