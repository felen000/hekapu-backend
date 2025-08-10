import nodemailer, {Transporter} from 'nodemailer';

class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Письмо для активации аккаунта от ' + process.env.CLIENT_NAME,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке </h1>
                        <a href="${process.env.API_URL +link}">${link}</a>
                    </div>
                `,
        });
    }
}

export default new MailService();