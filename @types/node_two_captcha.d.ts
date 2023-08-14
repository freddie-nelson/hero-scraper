declare module "@infosimples/node_two_captcha" {
    export interface Captcha {
        apiResponse: any;
        id: string;
        text: string;

        coordinates(): { x: number; y: number }[];
        indexes(): number[];
    }

    export default class Client {
        constructor(
            key: string,
            options: { timeout: number; polling: number; throwErrors: boolean },
        );

        decode(opts: {
            base64: any;
            buffer: Buffer;
            path: string;
            url: string;
        }): Promise<Captcha>;

        decodeRecaptchaV2(opts: {
            googlekey: string;
            pageurl: string;
        }): Promise<string>;

        decodeRecaptchaV3(opts: {
            googlekey: string;
            pageurl: string;
            action: string;
            enterprise?: boolean;
        }): Promise<string>;

        decodeHCaptcha(opts: {
            sitekey: string;
            pageurl: string;
            invisible?: boolean;
        }): Promise<string>;

        captcha(captchaId: string): Promise<Captcha>;

        report(captchaId: string, bad?: boolean): Promise<boolean>;
    }
}
