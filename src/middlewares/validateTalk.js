const validateTalk = (talkValue, res) => {
    if (!talkValue) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório' },
      );
    }
  };

const validateTalkRate = (rate, res) => {
  if (!rate) {
    return res.status(400).json(
      { message: 'O campo "rate" é obrigatório' },
    );
  }
  if (rate % 1 !== 0 || rate < 1 || rate > 5) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }
};

const validateTalkWatchedAt = (watchedAt, res) => {
  const validDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!watchedAt) {
    return res.status(400).json(
      { message: 'O campo "watchedAt" é obrigatório' },
    );
  }
  if (!validDate.test(watchedAt)) {
    return res.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  } 
}; 

  module.exports = (req, res, next) => {
    const { talk } = req.body;
  
    return validateTalk(talk, res)
      || validateTalkRate(talk.rate, res)
      || validateTalkWatchedAt(talk.watchedAt, res)
      || next();
  };