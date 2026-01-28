https://jsonplaceholder.typicode.com/users
// Imagine you are developing a real-time news application, and you need to fetch posts from three different sources to provide users with the latest updates.
// 
// The API endpoints for getting posts are:
// 
// https://dummyjson.com/posts
// https://this-may-not-exist.com/posts
// https://jsonplaceholder.typicode.com/posts
// 
// To ensure a seamless user experience, you are supposed to create a function called getFastPosts that fetches posts from these endpoints simultaneously (concurrently) and only presents data from the source that responds the quickest, while ignoring slower or potentially unreliable sources.
// 
// Example of how the function should be used

// getFastPosts() code here...

getFastPosts().then((posts) => {
    console.log(posts)
})
// Create a function called fetchUserTodos that uses the Promise.all() method to fetch users and todos concurrently from the provided API endpoints and combine them based on the userId. The function should return a promise that resolves with the combined data.

// Users endpoints https://jsonplaceholder.typicode.com/users
// Todos endpoints https://jsonplaceholder.typicode.com/todos

// The returned promise should resolve into an array of users, where each user object has a new key todos. This key shoul
// User object may look like
// {
//     id: 10,
//   name: 'Clementina DuBuque',
//   ...
// }

// Todo object may look like
// {
//     userId: 5,
//   completed: false,
//     ...
// }

// The result array will have objects that look like

// {
//     id: 10,
//   name: 'Clementina DuBuque',
//   todos: [
//         {
//             userId: 10,
//           completed: false,
//             ...
//         },
//         {
//             userId: 10,
//           completed: false,
//             ...
//         }
//     ]
//     ...
// }
// concurrency vs parallelism
// micro vs macro task queue
// how the event loop works together with callback queue to achieve concurency