export const fetchData = async (url, data, options = {}, method = "GET") => {
  try {
    if (data) {
      options.body = JSON.stringify(data);
      options.headers = {
        "Content-Type": "application/json",
      };
    }
    const response = await fetch(url, {
      method,
      ...options,
    });

    if (!response.ok) {
      const errMessage = await response.text();
      throw new Error(errMessage);
    }

    const result = await response.json();

    return {
      result: "success",
      data: result,
    };
  } catch (err) {
    return {
      result: "error",
      message: err.message,
    };
  }
};
