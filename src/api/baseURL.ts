import axios from "axios";

export const API_BASE_URL = "https://swapi.dev/api/";

export const fetchRelatedData = async (urls: string[]) => {
  if (!urls.length) return [];
  const results = await Promise.all(
    urls.map((url) =>
      axios.get(url).then((res) => res.data.name || res.data.title)
    )
  );
  return results;
};
