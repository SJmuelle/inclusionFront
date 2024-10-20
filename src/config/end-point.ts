const baseUrl = import.meta.env.VITE_BASE_URL;
const baseLocal = import.meta.env.VITE_BASE_LOCAL;

export class EndPoints {
    /**
     * @description: Url end-point base
     */
    static urlBase(url:string) {
        return baseUrl + url;
    }
     /**
     * @description: Url end-point base
     */
     static urlLocal(url:string) {
        return baseLocal + url;
    }
}