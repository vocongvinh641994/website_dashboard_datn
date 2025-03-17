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

export function getSentimentName(sentiment){
  console.log("Aaaaaa: "+ sentiment);
  sentiment = parseInt(sentiment)
  var result = "unidentified"
  switch(sentiment){
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


export function getCategoryName(category){
  category = category+ ""
  return CATEGORY_MAP[category]
}

