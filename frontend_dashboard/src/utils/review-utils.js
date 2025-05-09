export const REVIEW_TYPE = {
  POSITIVE: 2,
  NEGATIVE: 0,
  NEUTRAL: 1,
  UNKNOWN: -1,
};

export const REVIEW_CATEGORY = {
  DRIVER: "driver",
  APPLICATION: "application",
  ATTITUDE: "attitude",
  UNKNOWN: "unidentified",
  APPLICATION: "application",
  DRIVER: "driver",
  ATTITUDE: "operator",
  APPLICATION_DRIVER: "application_driver",
  APPLICATION_OPERATOR: "application_operator",
  DRIVER_OPERATOR: "driver_operator",
  APPLICATION_DRIVER_OPERATOR: "application_driver_operator",
  UNKNOWN: "unidentified",
};

export function getColorFromType(type) {
  var color = "#63BC46";
  switch (type) {
    case REVIEW_TYPE.POSITIVE:
      color = "#63BC46";
      break
    case REVIEW_TYPE.NEUTRAL:
      color = "#f0de89";
      break;
    case REVIEW_TYPE.NEGATIVE:
      color = "#ffaaa5";
      break;
    default:
      color = "#D2C0B0";
      break;
  }
  console.log("test color: "+ color);
  return color;
}

export function getSentimentName(sentiment) {
  console.log("Aaaaaa: " + sentiment);
  sentiment = parseInt(sentiment)
  var result = "unidentified"
  switch (sentiment) {
    case REVIEW_TYPE.POSITIVE:
      result = "Positive"
      break
    case REVIEW_TYPE.NEUTRAL:
      result = "Neutral"
      break
    case REVIEW_TYPE.NEGATIVE:
      result = "Negative"
      break
    default:
      result = ""
  }
  return result
}

const SENTIMENT = {
  UNKNOWN: "unidentified",
  APPLICATION: "application",
  DRIVER: "driver",
  OPERATOR: "attendant",
  APPLICATION_DRIVER: "application_driver",
  APPLICATION_OPERATOR: "application_attendant",
  DRIVER_OPERATOR: "driver_attendant",
  APPLICATION_DRIVER_OPERATOR: "application_driver_attendant",
};

const CATEGORY_MAP = {
  "-1": SENTIMENT.UNKNOWN,
  "0": SENTIMENT.APPLICATION,
  "1": SENTIMENT.DRIVER,
  "2": SENTIMENT.OPERATOR,
  "3": SENTIMENT.APPLICATION_DRIVER,
  "4": SENTIMENT.APPLICATION_OPERATOR,
  "5": SENTIMENT.DRIVER_OPERATOR,
  "6": SENTIMENT.APPLICATION_DRIVER_OPERATOR,
};


export function getCategoryName(category) {
  category = category + ""
  return CATEGORY_MAP[category]
}

export function isSameSentiment(sentiment, rating) {
  if (sentiment == null || sentiment == -1) return true;
  var score = 0;
  if (rating >= 4) {
    score = 2;
  } else if (rating == 3) {
    score = 1;
  } else {
    score = 0;
  }
  return sentiment == score;

}

