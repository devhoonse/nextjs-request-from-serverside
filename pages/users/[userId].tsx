import axios, {AxiosError} from "axios";
import Link from "next/link";

/**
 * 페이지 요청을 받아서 렌더링 하기 전에 수행합니다.
 * @param context
 */
export async function getServerSideProps(context: any) {
  const { userId } = context.query;

  // 퍼블릭 API 를 호출합니다.
  try {
    const userResponse = await axios.get(
      `${process.env.API_ENDPOINT}/users/${userId}`,
      {
        headers: {
          authorization: process.env.API_TOKEN
        }
      }
    );
    // 존재하는 사용자일 경우 응답 받은 사용자 정보를 페이지 컴포넌트로 전달합니다.
    const user = userResponse.data;
    return {
      props: {
        user
      }
    };

  } catch (error) { // 에러가 발생한 경우

    // 이 에러의 타입은 AxiosError 입니다.
    const axiosError = error as AxiosError;

    // 존재하지 않는 사용자일 경우 notFound 를 페이지 컴포넌트로 전달합니다.
    if (axiosError.response?.status === 404) {
      return {
        notFound: true // 이 값만 지정해서 반환해 주면, Next.js 에서 404 페이지를 렌더링해 줍니다.
      };
    } else {
      return {
        // todo: 404 이외의 에러 처리
      }
    }
  }
}

/**
 * 페이지 /users/${userId}
 * @param user
 * @constructor
 */
function User({ user }: { user: any }) {
  return (
    <div>
      <div>
        <Link passHref href="/public-api-viewer">Back To List</Link>
      </div>
      <hr/>
      <div style={{ display: 'flex' }}>
        <div>
          <div><b>Name : </b>{user.name}</div>
          <div><b>username : </b>{user.username}</div>
          <div><b>email : </b>{user.email}</div>
          <div><b>phone : </b>{user.phone}</div>
          <div><b>website : </b>{user.website}</div>
          <div><b>company.name : </b>{user.company.name}</div>
        </div>
      </div>
    </div>
  );
}
export default User;
