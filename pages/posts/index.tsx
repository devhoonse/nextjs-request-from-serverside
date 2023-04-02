import Link from "next/link";
import {useEffect, useState} from "react";

/**
 * 포스트 목록 표현하는 컴포넌트입니다.
 * @param posts
 * @constructor
 */
function PostList({ posts }: { posts: Array<any> }) {
  return (
    <ul>
      {posts.map((post, index) => (
        <li key={index}>
          <Link passHref href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * 페이지 : /posts
 * @constructor
 */
function Posts() {

  // API 요청 로딩 상태 및 응답 데이터를 보관할 상태 변수입니다.
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // 페이지 컴포넌트가 마운트된 시점에 실행합니다.
  useEffect(() => {
    (async () => {
      const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const postsData = await postsResponse.json();
      setLoading(false);
      setPosts(postsData);
    })();
  }, []);

  // 페이지 컴포넌트 구조
  return (
    <div>
      {loading && <div>Loading Posts...</div>}
      {posts && <PostList posts={posts} />}
    </div>
  );
}
export default Posts;
