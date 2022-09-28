import { httpGet } from "./mock-http-interface";

type SuccessResult = {
  "Arnie Quote": string;
};

type FailureResponse = {
  FAILURE: string;
};

type TResult = SuccessResult | FailureResponse;

type GetResponse = {
  status: number;
  body: string;
};

const getQuote = async (url: string) => {
  const response = (await httpGet(url)) as GetResponse;
  const body = JSON.parse(response.body);

  switch (response.status) {
    case 200:
      return {
        "Arnie Quote": body.message,
      } as SuccessResult;

    default:
      return {
        FAILURE: body.message,
      } as FailureResponse;
  }
};

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const quotes = await urls.map((url) => getQuote(url));

  return Promise.all(quotes);
};

/* return new Promise(async (resolve, reject) => {
    const results: TResult[] = [];

    const numUrls = urls.length;
    
    while (numUrls--) {
      const response = (await httpGet(urls[i])) as GetResponse;

      const body = JSON.parse(response.body);

      let result: TResult = {};

      if (response.status === 200) {
        result = {
          "Arnie Quote": body.message,
        };
      } else {
        result = {
          FAILURE: body.message,
        };

        results.push(result);
      }
    }

    //resolve(results);
  }); */
