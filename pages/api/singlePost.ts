import axios from "axios";

/**
 * API : /api/singlePosts?postId=${postId}
 * @param request
 * @param response
 */
export default async function handler(request: any, response: any) {

  // 요청을 보내야 하는 포스팅 ID 를 읽어옵니다.
  const { postId } = request.query;

  // 서버 측 환경 변수들을 읽어옵니다.
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const API_TOKEN = process.env.API_TOKEN;

  // API 서버로 포스트 정보를 요청합니다.
  const postResponse = await axios.get(
    `${API_ENDPOINT}/posts/${postId}`,
    {
      headers: { authorization: API_TOKEN }
    }
  );

  // 응답 받은 포스트 정보를 클라이언트로 응답합니다.
  response.status(200).json(postResponse.data);
}
