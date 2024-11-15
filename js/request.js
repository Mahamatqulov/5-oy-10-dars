import loader from "./loader.js";

const request = async (url) => {
  loader(true);
  try {
    const req = await fetch(url);
    if (!req.ok) {
      throw new Error("Something went wrong :(");
    }
    const data = await req.json();
    return data;
  } catch (error) {
    return error.massage;
  } finally {
    loader(false);
  }
};

export default request;
