export const ACCESS_TOKEN_KEY = "873ue874834eu927382";
export const AUTH_COOKIE = "sana-user-session";

interface CookieItem {
  key: string;
  value: string;
  expiry?: Date;
}

class Storage {
  static get storage() {
    return document.cookie;
  }
  
  static setItem(item: CookieItem) {
    const { key, value, expiry } = item;
    return (document.cookie = `${key}=${value};expires=${expiry};path=/`);
  }

  static getItem(key: string) {
    const decodedCookie = decodeURIComponent(this.storage);
    const cookies: Array<{ key: string; value: string }> = decodedCookie
      .split(";")
      .map((cookieString) => {
        const key = cookieString.split("=")[0];
        const value = cookieString.split("=")[1];
        return { key, value };
      })
      .filter((cookie) => cookie.key === key);
    return cookies[0]?.value;
  }

  static removeItem(key: string) {
    console.log(key);
    document.cookie = `${key} = expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  static getAccessToken() {
    return this.getItem(ACCESS_TOKEN_KEY);
  }

  static setAccessToken(token: string) {
    const now = new Date();
    return this.setItem({
      key: ACCESS_TOKEN_KEY,
      value: token,
      expiry: new Date(now.setDate(now.getDate() + 30)),
    });
  }

  static removeAccessToken() {
    return this.removeItem(ACCESS_TOKEN_KEY);
  }
}
export default Storage;
