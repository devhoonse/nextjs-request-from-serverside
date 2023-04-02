import {useEffect, useState} from "react";
import Link from "next/link";

/**
 * 페이지 요청을 받아서 렌더링 하기 전에 수행합니다.
 * @param context
 */
export async function getServerSideProps(context: any) {
  const { postId } = context.query;

  // 페이지 컴포넌트로 필요한 값들을 전달합니다.
  return {
    props: {
      postId
    }
  };
}

/**
 * 페이지 : /posts/${postId}
 * @param postId
 * @constructor
 */
function Post({ postId }: { postId: string; }) {

  // API 요청 로딩 상태 및 응답 데이터를 보관할 상태 변수입니다.
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<null | any>(null);

  // 페이지 컴포넌트가 마운트된 시점에 실행합니다.
  useEffect(() => {
    (async () => {
      const postResponse = await fetch(`/api/singlePost?postId=${postId}`);
      const postData = await postResponse.json();
      setLoading(false);
      setPost(postData);
    })();
  }, [postId]);

  // 페이지 컴포넌트 구조
  return (
    <div>
      <div>
        <Link passHref href="/posts">Back To List</Link>
      </div>
      <hr/>
      {loading && <div>Loading Post Data...</div>}
      {post && JSON.stringify(post)}
    </div>
  );
}
export default Post;
