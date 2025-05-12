import {I18n} from "@grammyjs/i18n"


export const i18n = new I18n({
    defaultLocale: "uz",
    useSession: true,
    directory: "./telegram-bot/i18n/locales",
});