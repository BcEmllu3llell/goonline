import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=20&_page=${page}`
      );

      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts((prev) => [...prev, ...res.data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh", // фон на всю высоту
        backgroundColor: "#000",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Як тобі?</h1>

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<p>Loading more posts...</p>}
        endMessage={<p style={{ textAlign: "center" }}>🎉 Все посты загружены!</p>}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#111",
              }}
            >
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default App;
