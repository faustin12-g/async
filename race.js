const p1 = new Promise((resolve, reject)=>setTimeout(()=>resolve('First Promise'), 200));
const p2 = new Promise((resolve, reject)=>setTimeout(()=>resolve('Second Promise'), 1000));
const p3 = new Promise((resolve, reject)=>setTimeout(()=>resolve('Third Promise'), 100));
const p4 = new Promise((resolve, reject)=>setTimeout(()=>reject("This functions failed in race"), 50));

Promise.race([p1, p2, p3, p4]).then((value)=>console.log("The winner is : ", value))
.catch((error)=>console.log("Error: ", error));