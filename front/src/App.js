import { useState } from 'react';
import './App.css';
import GeneralInfo from './components/GeneralInfo';
import Post from './components/Post';



function App() {
  const [general, setGeneral] = useState(null);

  const fetchFakeData = async() => {

    try {
      const [responseUser, responsePosts, responseComments] = await Promise.all(
        [
          fetch('https://jsonplaceholder.typicode.com/users?id=1'),
          fetch('https://jsonplaceholder.typicode.com/posts?userId=1'),
          fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
        ]
      );

      const [[user], posts, comments] = await Promise.all([
        responseUser.json(),
        responsePosts.json(),
        responseComments.json()
      ]);

      const firstPost = posts?.length ? posts[0] : {};

      setGeneral({
        user,
        firstPost,
        comments
      });
    } catch (_) {
      console.log(_);
    }

    return;
  }

  const fetchRealData = async() => {
    try {
      const response = await fetch('http://users/');
      const general = await response.json();

      setGeneral(general);
    } catch (_) {
      console.log(_)
    }
  }

  const clearData = () => setGeneral(null);

  const {user, firstPost, comments} = general || {};

  return (
    <div className="App">
      <div className='buttons'>
      <button onClick={fetchFakeData}>Получить данные напрямую</button>
      <button onClick={clearData}>Стереть</button>
      <button onClick={fetchRealData}>Получить данные с сервера</button>
      </div>

      <header className="App-header" />
      <div className='body'>
        <GeneralInfo user={user}/>
        <Post post={firstPost} comments={comments} />
      </div>
    </div>
  );
}

export default App;
