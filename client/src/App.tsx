import React from 'react';
import LetterPullup from './components/magicui/letter-pullup';
function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
  <LetterPullup words={"Staggered Letter Pull Up"} delay={0.05} />
    </div>
  );
}

export default App;
