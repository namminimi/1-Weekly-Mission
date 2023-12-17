import axios from "axios";
const instance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api",
  /* withCredentials: true, */
});

export default instance;

/* instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config; //에러 config를 가져와서
    if (error.response?.status === 401 && !originalRequest._retry) {
      //토큰을 수정하면
      await instance.post("/auth/token/refresh", undefined, { _retry: true });
      
      originalRequest._retry = true;
      return instance(originalRequest); 
    }
    return Promise.reject(error);
  }
); */