const ACCESS_TOKEN_KEY = "sdlfkj33r9uefrlkjed";
const AUTH_COOKIE = "gp-calc";

interface CookieItem {
  key: string;
  value: string;
  expiry?: Date;
}

class StorageService {
  static get storage() {
    return document.cookie;
  }

  static setItem(item: CookieItem) {
    const { key, value, expiry } = item;
    return (document.cookie = `${key}=${value};expires=${expiry}`);
  }

  static getItem(key: string) {
    let decodedCookie = decodeURIComponent(this.storage);
    let cookies = decodedCookie
      .split(";")
      .map((cookie) => {
        let [key, value] = cookie.split("=");
        return { key, value };
      })
      .filter((cookie) => cookie.key === key);
    return cookies[0].value;
  }

  static removeItem(key: string) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  static setAccessToken(token: string) {
    const now = new Date();
    return this.setItem({
      key: ACCESS_TOKEN_KEY,
      value: token,
      expiry: new Date(now.setDate(now.getDate() + 30)), // 30 days before logout.
    });
  }

  static removeAccessToken() {
    return this.removeItem(ACCESS_TOKEN_KEY);
  }
}

export default StorageService;
