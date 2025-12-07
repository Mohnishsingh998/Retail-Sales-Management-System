const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";


export const getSales = async (params = {}) => {
  try {
    const query = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val === undefined || val === null || val === "") return;

      if (Array.isArray(val)) {
        if (val.length) query.append(key, val.join(","));
      } else {
        query.append(key, String(val));
      }
    });

    const url = `${API_BASE_URL}/sales${query.toString() ? `?${query.toString()}` : ""}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(`API Error ${res.status}${text ? ` - ${text}` : ""}`);
    }

    return await res.json();
  } catch (err) {
    console.error("getSales error:", err);
    throw err;
  }
};

export default getSales;
