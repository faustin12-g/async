# Promise & Async/Await Error Handling - Learning Path

## 📚 Level 1: Foundation (Beginner)

### Theory: What are errors in Promises?
Promises have two states when they settle:
- **Fulfilled** (resolved) - operation succeeded
- **Rejected** - operation failed

When a promise rejects, the error propagates until something catches it. If nothing catches it, you get an "unhandled rejection" warning.

### Concept 1: Catching Promise Errors

**Two ways to catch:**
1. `.catch()` method (promise-style)
2. `try/catch` block (async/await style)

**Exercise 1.1:** Create a rejected promise and catch it
```javascript
// Create a promise that rejects after 1 second
// Use .catch() to handle the error
// Log "Error caught: [message]" to console
```

**Exercise 1.2:** Convert to async/await
```javascript
// Same as above but use async/await with try/catch
```

---

### Concept 2: Error Propagation in Chains

**Key principle:** Errors skip `.then()` handlers and jump to the next `.catch()`

**Exercise 2.1:** Build a chain that throws
```javascript
// Create a promise chain:
// Start with value 10
// Multiply by 2
// Throw an error "Something broke!"
// Try to multiply by 3 (should be skipped)
// Catch the error
// Return a recovery value "recovered"
// Log the final result
```

**Expected output:** Should log "recovered", not skip to error

---

### Concept 3: The Critical Rule - ALWAYS AWAIT

**THE MOST IMPORTANT RULE:**
```javascript
// ❌ WRONG - Error escapes
try {
    fetch(url); // No await = no catch
} catch (e) {
    // Never executes
}

// ✅ CORRECT
try {
    await fetch(url); // Await = catch works
} catch (e) {
    // Executes on error
}
```

**Exercise 3.1:** Find the bug
```javascript
async function buggyFunction() {
    try {
        const data = fetchData(); // Missing something?
        console.log(data);
    } catch (error) {
        console.error('Caught:', error);
    }
}
```

**Question:** What's wrong? Fix it.

---

## 📚 Level 2: HTTP & Fetch (Intermediate)

### Theory: Fetch Doesn't Reject on HTTP Errors!

**CRITICAL GOTCHA:** `fetch()` only rejects on network failures (DNS errors, no internet, etc.)

HTTP errors like 404, 500 **DO NOT reject** - they resolve with `response.ok = false`

**Exercise 4.1:** Proper fetch error handling
```javascript
// Write a function that:
// 1. Fetches from 'https://jsonplaceholder.typicode.com/posts/999999' (doesn't exist)
// 2. Checks if response.ok is false
// 3. If false, throw an error with the status code
// 4. Otherwise return the JSON data
// 5. Catch any errors and log them
```

**Expected:** Should catch "HTTP Error: 404" not get JSON parsing error

---

### Concept 4: Multiple Promises - Which Method?

| Method | Behavior | Use When |
|--------|----------|----------|
| `Promise.all()` | Rejects if ANY fails | All are required |
| `Promise.allSettled()` | Never rejects, returns all results | Need all outcomes |
| `Promise.any()` | Resolves on FIRST success | First valid response wins |
| `Promise.race()` | Settles on FIRST (resolve OR reject) | Speed matters, even failures |

**Exercise 5.1:** Test Promise.all failure
```javascript
// Create 3 fetch promises:
// - https://jsonplaceholder.typicode.com/users (succeeds)
// - https://invalid-domain-xyz.com/api (fails fast)
// - https://jsonplaceholder.typicode.com/posts (succeeds)
//
// Use Promise.all() and observe what happens
// Does it wait for all? Or stop at first failure?
```

**Exercise 5.2:** Use Promise.allSettled instead
```javascript
// Same 3 promises but with Promise.allSettled()
// Log which ones succeeded and which failed
// Check the status property (fulfilled/rejected)
```

**Exercise 5.3:** Fix your gate11.js with Promise.any
```javascript
// Go back to gate11.js
// Replace Promise.race with Promise.any
// Test that it now returns the first SUCCESS, ignoring the fast failure
```

---

## 📚 Level 3: Advanced Patterns (Advanced)

### Concept 5: Finally Block - Cleanup

**Theory:** `finally` runs whether success or failure. Used for cleanup.

**Common uses:**
- Close database connections
- Release file locks
- Stop loading spinners
- Cancel timers

**Exercise 6.1:** Resource cleanup
```javascript
// Create a function that:
// 1. Starts a timer with setTimeout (log "Timer started")
// 2. Fetches data (use any URL)
// 3. In finally: clear the timer and log "Timer cleared"
// Test with both valid and invalid URLs
```

---

### Concept 6: Timeout Pattern

**Problem:** Fetch can hang forever if server is slow

**Solution:** Race against a timeout promise

**Exercise 7.1:** Implement timeout
```javascript
// Write a function fetchWithTimeout(url, ms)
// Create two promises:
// 1. The actual fetch
// 2. A promise that rejects after ms milliseconds with "Timeout"
// Use Promise.race to return whichever finishes first
// 
// Test with: 'https://httpbin.org/delay/5' and 2000ms timeout
```

---

### Concept 7: Retry Pattern

**Theory:** Sometimes failures are temporary (network glitch, server reboot)
Retrying can succeed on attempt 2 or 3.

**Exercise 8.1:** Basic retry
```javascript
// Write fetchWithRetry(url, maxRetries)
// Use a for loop from 1 to maxRetries
// Try to fetch, if it fails:
//   - If attempts remain: wait 1 second and retry
//   - If no attempts remain: throw the error
//
// Test with an unreliable URL that might fail sometimes
```

**Exercise 8.2:** Exponential backoff
```javascript
// Improve your retry:
// Wait time = attempt number * 1000ms
// Attempt 1: wait 1s
// Attempt 2: wait 2s
// Attempt 3: wait 3s
```

---

### Concept 8: Custom Error Classes

**Why?** Different errors need different handling (network vs validation vs auth)

**Exercise 9.1:** Create error types
```javascript
// Create 3 custom error classes:
// 1. NetworkError - has statusCode property
// 2. ValidationError - has field property
// 3. AuthenticationError - has no extra properties
//
// Write a function that throws different errors based on:
// - Status 401 → AuthenticationError
// - Status 4xx/5xx → NetworkError
// - Missing data.id → ValidationError
//
// Catch and handle each type differently
```

---

## 📚 Level 4: Real-World Scenarios (Pro)

### Challenge 1: Robust API Client
**Requirements:**
- Timeout after 5 seconds
- Retry 3 times on 5xx errors only (not 4xx)
- Proper HTTP error checking
- Return `{ success: true, data }` or `{ success: false, error }`

**Questions to answer yourself:**
1. Should you retry on 404? (No - it won't suddenly exist)
2. Should you retry on 500? (Yes - server might recover)
3. Where should the timeout check happen? (In each retry attempt)
4. How do you prevent error propagation? (Return objects instead of throwing)

### Challenge 2: Parallel with Fallback
**Scenario:** Fetch user from 3 sources, use first success, if all fail use cached data

**Steps:**
1. Use Promise.any for first success
2. Catch the AggregateError (when all reject)
3. Return cached data as fallback

### Challenge 3: Dependent Requests with Recovery
**Scenario:** 
1. Fetch user
2. If succeeds: fetch their posts
3. If posts fail: return user with empty posts array
4. If user fails: return null

**Think about:** How many try/catch blocks? Nested or separate?

---

## 🎯 Common Mistakes Quiz

Fix these broken functions:

```javascript
// 1. What's wrong?
async function mistake1() {
    try {
        fetch('url');
    } catch (e) {
        console.log(e);
    }
}

// 2. What's wrong?
async function mistake2() {
    try {
        const res = await fetch('url');
        const data = await res.json();
        return data;
    } catch (e) {
        console.log('Error happened');
    }
}

// 3. What's wrong?
getPosts().then(console.log()).catch(console.error());

// 4. What's wrong?
const results = await Promise.all([
    fetch('url1'),
    fetch('url2').catch(e => null),
    fetch('url3')
]);
```

---

## 📋 Checklist Before Moving Forward

Can you explain:
- [ ] Difference between Promise.all and Promise.any?
- [ ] Why fetch needs response.ok check?
- [ ] When to use finally?
- [ ] How to implement timeout?
- [ ] How to implement retry with backoff?
- [ ] Why .then(console.log()) is wrong?
- [ ] What happens if you don't await in try/catch?

Can you code:
- [ ] Function that fetches with timeout
- [ ] Function that retries 3 times
- [ ] Function that handles HTTP errors properly
- [ ] Function that uses Promise.any correctly
- [ ] Custom error class

---

## 🚀 Next Steps

After mastering this:
1. Study AbortController for cancellation
2. Learn about Promise.withResolvers (new API)
3. Practice error boundaries in frameworks (React, etc.)
4. Study structured error logging for production

**Study Method:**
1. Read theory
2. Write code yourself (don't copy)
3. Test with real APIs
4. Break it intentionally to see errors
5. Fix it yourself

Ask me questions about ANY concept you don't understand!
