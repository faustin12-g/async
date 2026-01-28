const p1 = new Promise((resolve, reject)=>setTimeout(resolve(10), 1000));
const p2 = new Promise((resolve)=>setTimeout(resolve(20), 2000));
const p3 = new Promise((resolve)=> setTimeout(resolve(30), 1500));

Promise.all([p1, p2, p3]).then((values)=>{
    const sum = values.reduce((a,b) => a+b, 0)
    console.log(sum)
})
