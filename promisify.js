// Write a JavaScript program that converts this callback-based function to a promise-based function.

function fetchData(callback) {
    setTimeout(() => {
      const data = "Data fetched successfully!";
      callback(null, data);
    }, 1000);
  }

fetchData((error, data) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log(data);
    }
  });

function promisify()
{
    return new Promise((resolve, reject)=>{
        fetchData((error, user)=>{
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

promisify().then(data=>{
    console.log("Data promisifed: ",data)
})
.catch(error=>console.log("Error promisified: ", error.message))