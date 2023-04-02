import Link from "next/link";
import axios from "axios";

/**
 * 페이지 요청을 받아서 렌더링 하기 전에 수행합니다.
 */
export async function getServerSideProps() {

  // 퍼블릭 API 를 호출합니다.
  const usersResponse = await axios.get(`${process.env.API_ENDPOINT}/users`);
  const users = usersResponse.data;

  // 응답 받은 사용자 목록을 페이지 컴포넌트로 전달합니다.
  return {
    props: {
      users
    }
  };
}

/**
 * 페이지 : /public-api-viewer
 * @param users
 * @constructor
 */
function PublicApiViewer({ users }: { users: Array<any> }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          <Link passHref href={`/users/${user.id}`}>
            [{user.id}] {user.username}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PublicApiViewer;
