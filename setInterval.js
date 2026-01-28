let counter = 0;
const intervalId = setInterval(()=>{
    counter++;
    console.log('Interval count: ', counter);
    if(counter >= 5)
    {
        clearInterval(intervalId);
        console.log('Interval cleared.');
    }
}, 1000);

