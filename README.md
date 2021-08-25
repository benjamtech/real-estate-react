# @real-estate/react
A small package to use @real-estate/core state management with React.

Read the readme of @real-estate/core first, to make sure you understand this. 

#### Step 0: Install the package
```bash
npm install @real-estate/react
```

#### Step 1: Register state in each React component
```typescript
import React from 'react';
import useRStateWatcher from "@real-estate/react"

function Example() {
  useRStateWatcher([state1, state2, state3]) // Register all states to watch for here, and the React component will update as soon as the state changes. 

    // After registering state in useRStateWatcher, you can use it as normally in your component
  return (
    <div>
      <p>{state1.get()}</p>
      <p>{state2.get()}</p>
      <p>{state3.get()}</p>
    </div>
  );
}
```



The hook takes an array with the states to watch for. Then it refreshes the component when any of the states in the array changes. This needs to be done in **every component that uses instance(s) of the RState class**. 



Real-estate is not meant to replace local state in React. But when it comes to global state, real-estate can do a great job. 
