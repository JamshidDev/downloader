// Kerakli kutubxonalar: HTTP so‘rovlar uchun axios va HTML tahlil qilish uchun cheerio
import axios from "axios"
import * as cheerio from 'cheerio';

// Kodning asosiy funksiyasi: Instagram yoki Facebook’dan video yuklash
export const downloadMedia = (url) => {
    // Funksiya Promise qaytaradi, chunki so‘rovlar asinxron tarzda amalga oshiriladi
    return new Promise(async (resolve) => {
        try {
            // 1. URL-ni tekshirish: Instagram yoki Facebook havolasi ekanligini aniqlash
            const isValidUrl = url.match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/) ||
                url.match(/(https|http):\/\/www.instagram.com\/(p|reel|tv|stories)/gi);
            if (!isValidUrl) {
                // Agar URL noto‘g‘ri bo‘lsa, xato xabarini qaytarish
                return resolve({
                    developer: "@Milan Bhandari",
                    status: false,
                    message: "Noto‘g‘ri URL kiritildi"
                });
            }

            // 2. Dekodlash funksiyasi: Snapsave javobidagi shifrlangan ma'lumotlarni ochish
            function decodeResponse(data) {
                // Kiruvchi ma'lumotlarni tekshirish

                // Parametrlarni ajratish va ularning to‘g‘riligini tekshirish
                if (!Array.isArray(data) || data.length < 5) {
                    throw new Error("Noto‘g‘ri parametrlar: Kamida 5 ta parametr kutilmoqda");
                }

                let [encryptedText, key1, key2, offset, base] = data;
                let result = '';

                // Parametrlarni tekshirish
                if (!encryptedText || typeof encryptedText !== 'string') {
                    throw new Error("encryptedText bo‘sh yoki noto‘g‘ri formatda");
                }
                if (!key2 || typeof key2 !== 'string') {
                    throw new Error("key2 bo‘sh yoki noto‘g‘ri formatda");
                }
                if (isNaN(offset) || isNaN(base)) {
                    throw new Error("offset yoki base raqam bo‘lishi kerak");
                }

                // base qiymatini tekshirish
                base = parseInt(base);
                if (base >= key2.length) {
                    throw new Error("base qiymati key2 uzunligidan katta");
                }

                let index = 0;

                // Har bir belgini dekodlash
                while (index < encryptedText.length) {
                    let tempStr = '';

                    // Belgilar key2’dagi belgilarga mos kelguncha to‘plash
                    while (index < encryptedText.length && encryptedText[index] !== key2[base]) {
                        tempStr += encryptedText[index];
                        index++;
                    }

                    // Key2’dagi belgilarni raqamlarga aylantirish
                    for (let j = 0; j < key2.length; j++) {
                        tempStr = tempStr.replace(new RegExp(key2[j], 'g'), j.toString());
                    }

                    // Raqamni dekodlash va belgiga aylantirish
                    try {
                        const decodedNumber = convertBase(tempStr, base, 10);
                        if (isNaN(decodedNumber)) {
                            throw new Error("Dekodlashda xato: tempStr noto‘g‘ri formatda");
                        }
                        result += String.fromCharCode(decodedNumber - offset);
                    } catch (e) {
                        console.error("Dekodlash xatosi:", e.message, "tempStr:", tempStr);
                        throw e;
                    }

                    // Key2[base] belgisini o‘tkazib yuborish
                    index++;
                }

                return decodeURIComponent(encodeURIComponent(result));

                // Raqamlarni bir bazadan boshqasiga o‘tkazish funksiyasi
                function convertBase(str, fromBase, toBase) {
                    const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split('');
                    let fromDigits = digits.slice(0, fromBase);
                    let toDigits = digits.slice(0, toBase);

                    // Satrdan raqamga aylantirish
                    let num = str.split('').reverse().reduce((acc, char, idx) => {
                        if (fromDigits.includes(char)) {
                            return acc + fromDigits.indexOf(char) * Math.pow(fromBase, idx);
                        }
                        return acc;
                    }, 0);

                    // Raqamni yangi bazaga o‘tkazish
                    let result = '';
                    while (num > 0) {
                        result = toDigits[num % toBase] + result;
                        num = Math.floor(num / toBase);
                    }
                    return result || '0';
                }
            }

            // 3. Snapsave javobidan dekodlash parametrlarni olish
            function extractDecodeParams(data) {
                // Javobdan shifrlangan qismlarni ajratib olish
                return data.split("decodeURIComponent(escape(r))}(")[1]
                    .split('))')[0]
                    .split(',')
                    .map(param => param.replace(/"/g, '').trim());
            }

            // 4. HTTP so‘rov uchun sarlavhalar (headers)
            const requestHeaders = {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "content-type": "application/x-www-form-urlencoded",
                origin: "https://snapsave.app",
                referer: "https://snapsave.app/id",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
            };

            // 5. Snapsave.app saytiga so‘rov yuborish
            const response = await axios.post(
                "https://snapsave.app/action.php?lang=id",
                `url=${url}`,
                { headers: requestHeaders }
            );

            // 6. Javobni qayta ishlash
            const responseData = response.data;
            // Javobdan shifrlangan ma'lumotlarni dekodlash
            const decodedHtml = decodeResponse(extractDecodeParams(responseData))
                .split('getElementById("download-section").innerHTML = "')[1]
                .split('"; document.getElementById("inputData").remove(); ')[0]
                .replace(/\\(\\)?/g, '');

            // 7. HTML-ni tahlil qilish uchun cheerio yuklash
            const $ = cheerio.load(decodedHtml);
            const downloadLinks = [];

            // 8. Ma'lumotlarni HTML-dan olish
            if ($("table.table").length || $("article.media > figure").length) {
                // Agar jadval yoki media elementi bo‘lsa
                const thumbnail = $("article.media > figure").find("img").attr("src");
                // Jadvaldagi har bir qatorni ko‘rib chiqish
                $("tbody > tr").each((index, row) => {
                    const $row = $(row);
                    const cells = $row.find('td');
                    const resolution = cells.eq(0).text(); // Video sifati
                    let downloadUrl = cells.eq(2).find('a').attr("href") ||
                        cells.eq(2).find("button").attr("onclick");
                    // Agar URL get_progressApi funksiyasida bo‘lsa, uni tozalash
                    const isProgressApi = /get_progressApi/ig.test(downloadUrl || '');
                    if (isProgressApi) {
                        downloadUrl = /get_progressApi\('(.*?)'\)/.exec(downloadUrl || '')?.[1] || downloadUrl;
                    }
                    // Yuklash ob‘yektini yaratish
                    downloadLinks.push({
                        resolution: resolution,
                        thumbnail: thumbnail,
                        url: downloadUrl,
                        shouldRender: isProgressApi
                    });
                });
            } else {
                // Agar boshqa turdagi HTML tuzilmasi bo‘lsa
                $("div.download-items__thumb").each((index, thumb) => {
                    // console.log(index)
                   const thumbnail = $(thumb).find("img").attr("src")
                    const btn = $("div.download-items__btn").eq(index); // Mos keluvchi tugmani olish
                    let downloadUrl = btn.find('a').attr('href');

                    // Agar URL to‘liq bo‘lmasa, snapsave.app domenini qo‘shish
                    if (!/https?:\/\//.test(downloadUrl || '')) {
                        downloadUrl = "https://snapsave.app" + downloadUrl;
                    }

                    downloadLinks.push({
                        thumbnail: thumbnail,
                        url: downloadUrl
                    });
                });

            }

            // 9. Agar hech qanday ma'lumot topilmasa, xato qaytarish
            if (!downloadLinks.length) {
                return resolve({
                    developer: "@Milan Bhandari",
                    status: false,
                    message: "Hech qanday ma'lumot topilmadi"
                });
            }


            // 10. Muvaffaqiyatli javob qaytarish
            return resolve({
                developer: "@Milan Bhandari",
                status: true,
                data: downloadLinks
            });

        } catch (error) {
            console.log(error)
            // Xato yuz bersa, xato xabarini qaytarish
            return resolve({
                developer: "@Milan Bhandari",
                status: false,
                message: error.message
            });
        }
    });
};
