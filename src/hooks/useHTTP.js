import axios from 'axios';
import { useState } from "react";

function useHTTP() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const sendHTTP = async (path, method, body = {}, isMultiPart = false) => {

    setLoading(true);
    setError(false);

    let options = {
      url: path,
      method: method,
      data: body,
    };

    if (isMultiPart) {
      const bodyFormData = new FormData();
      Object.keys(body).forEach((key) => {
        bodyFormData.append(key, body[key]);
      });
      delete options["body"];
      options = {
        ...options,
        content: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      };
    }

    console.log("🥽🥽🥽 Request 🥽🥽🥽", path, method,
      isMultiPart ? {
        ...options,
        content: () => options.content.map((item) => ({ [item.key]: item.value }))
      }
        : options
    );

    try {
      const response = await client(options);
      const res = response?.data;
      setData(res);
      setLoading(false);
      setError(false);
      res && console.log("📩📩📩 Response 📩📩📩", { data: res, loading: false, error: false });
      return { data: res, loading: false, error: false };

    } catch (err) {
      if (axios.isCancel(err)) { console.log('Request canceled', err.message); } else { setError(err); }
      console.log("❌ useHTTP err ❌", err);
      setError(err);
      setLoading(false);
      return { data: null, error: err, loading: false };
    }

  };



  return [sendHTTP, { data, error, loading }];
};



export default useHTTP;