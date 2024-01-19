import { API_URL } from "@/config/apiUrl";
import { useEffect, useState } from "react";

/* export function useFetch(path: string, id: number) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchUrl = async (type: string) => {
    try {
      const response = await fetch(`${API_URL}${type}`);
      if (!response.ok) {
        throw new Error("사용자 데이터를 불러오는데 실패했습니다.");
      }
      const body = await response.json();
      setData(body);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        return;
      }
    }
  };
  useEffect(() => {
    fetchUrl(path);
  }, []);

  return {
    data,
    fetchUrl,
    errorMessage,
  };
}

export function useQueryFetch(
  path: string,
  folderId: string | null = null,
  id: number
) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchUrl = async (type: string, number: string | null) => {
    const query = `?folderId=${number}`;
    try {
      const response = await fetch(`${API_URL}${type}${folderId ? query : ""}`);
      if (!response.ok) {
        throw new Error("사용자 데이터를 불러오는데 실패했습니다.");
      }
      const body = await response.json();
      setData(body);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        return;
      }
    }
  };
  useEffect(() => {
    fetchUrl(path, folderId);
  }, []);

  return {
    data,
    fetchUrl,
    errorMessage,
  };
} */

interface OptionType {
  method?: string;
  path?: string;
  query?: string;
  param?: number | null;
  datas?: any;
  deps?: [];
}

interface FetchOptionsType {
  method: string;
  headers: {};
  body?: string;
}

const getAccessToken = () => {
  if (typeof window !== `undefined`) {
    return localStorage.getItem("user");
  }
};

export function useNewFetch(option: OptionType) {
  const [data, setData] = useState(null);
  const { method, param, path, query, datas, deps } = option;
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchUrl = async (option?: OptionType) => {
    if (!method) return;
    const upperMethod = method.toUpperCase();
    const queryString = query ? `?${query}=${param ?? ""}` : "";

    const fetchOptions: FetchOptionsType = {
      method: upperMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    if (["POST", "PUT", "PATCH"].includes(upperMethod) && data) {
      fetchOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(
        `${API_URL}${path}${queryString}`,
        fetchOptions
      );

      console.log(response);
      if (!response.ok) {
        throw new Error("사용자 데이터를 불러오는데 실패했습니다.");
      }
      const body = await response.json();
      console.log(body);
      setData(body);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        return;
      }
    }
  };
  useEffect(() => {
    fetchUrl(option);
  }, []);

  return {
    data,
    fetchUrl,
    errorMessage,
  };
}
