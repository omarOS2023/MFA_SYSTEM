const axios = require("axios");

const compareFaces = async (imageUrl1, imageUrl2) => {
  const apiKey = process.env.API_KEY_FACE;
  const apiSecret = process.env.API_SECRET_FACE;

  const params = new URLSearchParams();
  params.append("api_key", apiKey);
  params.append("api_secret", apiSecret);
  params.append("image_url1", imageUrl1);
  params.append("image_url2", imageUrl2);

  const response = await axios.post(
    "https://api-us.faceplusplus.com/facepp/v3/compare",
    params
  );

  return response.data.confidence; // بترجع درجة التشابه
};

module.exports = compareFaces;
