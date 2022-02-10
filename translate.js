app.post('/api/songs/translate', (req, res) => {
  const { text,lang } = req.body
  const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
          to: `${lang}`,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
      },
      headers: {
          "content-type": "application/json",
          "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.TRANS_API_KEY}`,
      },
      data: [{ Text: text }],
  };
  axios
      .request(options)
      .then(function (response) {
          res.status(200).send(response.data[0].translations[0].text);
      })
      .catch(function (error) {
          res.status(400).send(error);
      });
});