interface ParamsType { [key: string]: string | number };

export function redirectUrl(url: string, params?: ParamsType) {
  if (typeof window !== "undefined") {
    try {
      const _url = new URL(url);

      if (params) {
        const keyList = Object.keys(params);
        for (let i = 0; i < keyList.length; i += 1) {
          const key = keyList[i];
          _url.searchParams.set(keyList[i], params[key]?.toString());
        }
      }

      window.location.assign(_url.href);
    } catch (e) {
      throw new Error("The URL is not valid");
    }
  }
}
