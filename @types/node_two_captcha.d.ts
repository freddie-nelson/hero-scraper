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
        }): Promise<{ text: string; id: string } | undefined>;

        decodeRecaptchaV3(opts: {
            googlekey: string;
            pageurl: string;
            action: string;
            enterprise?: boolean;
        }): Promise<{ text: string; id: string } | undefined>;

        decodeHCaptcha(opts: {
            sitekey: string;
            pageurl: string;
            invisible?: boolean;
        }): Promise<{ text: string; id: string } | undefined>;

        captcha(captchaId: string): Promise<Captcha>;

        report(captchaId: string, bad?: boolean): Promise<boolean>;
    }
}
