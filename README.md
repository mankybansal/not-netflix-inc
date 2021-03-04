# not-netflix-inc

This project is a sample mobile web app for **Not Netflix Inc**!

View a running demo here: https://not-netflix-inc.vercel.app/

<img src="https://github.com/mankybansal/not-netflix-inc/blob/master/screenshots/screen1.png" alt="img-1" width="250"><img src="https://github.com/mankybansal/not-netflix-inc/blob/master/screenshots/screen2.png" alt="img-2" width="250"><img src="https://github.com/mankybansal/not-netflix-inc/blob/master/screenshots/screen3.png" alt="img-3"  width="250"> 

<img src="https://github.com/mankybansal/not-netflix-inc/blob/master/screenshots/low-res-gif.gif" width="750">

<img src="https://github.com/mankybansal/not-netflix-inc/blob/master/screenshots/test-runs.png" width="750">

## Setup
### Start Dev Server
```
npm install
npm start
```
### Running Jest Tests
```
npm test
```

## Notes 

### 1. What were the most difficult tasks?
- Typing the response from the OMDb API to allow for one hook that could make any api request and ensures type safety for the returned data object in multiple shapes. 

### 2. Did you learn anything new while completing this assignment?
- Learned about image fallbacks

### 3. What did you not have time to add? What work took the up majority of your time?
- Optimize for desktop
- Add more unit tests
- Add E2E tests
- Virtualize the list
- Orchestrate the animations
- Add autocomplete for search
- Break down bigger components into smaller sub-components (invoice, order confirmation, etc.) 
- Comprehensive error handling (network, retries, UX feedback)

### 4. How could the application be improved?
#### Technical:
- Would probably store all the selected movie state in the app, but the search query would need to be modified to include more information.
- Add global style overrides and set cleanup styles.
- Move all colors, grid units into a theme.
- Would add more props to the generic components 
- Use routes instead of maintaining the `currentPage` in the `AppContext`.

#### Design:
- The `MediaDetails` page goes back and resets the search. Ideally you want to preserve the search, and for that maybe add search params to the URL. 
- Add more filtering / search options
- Virtualizing the list for better performance
- Add autocomplete for search & search on keyup. The OMDb API had a limit / account, so I decided to leave it at `hit enter to search`.
- More loading / interim fallback states
