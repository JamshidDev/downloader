

export const Platforms ={
    youtube:'youtube',
    instagram:'instagram',
    tiktok:'tiktok',
    unknown:'unknown',
}

export const detectPlatformByUrl = (url)=>{
    const lowerUrl = url.toLowerCase()

    switch (true) {
        case lowerUrl.includes('youtube.com'):
        case lowerUrl.includes('youtu.be'):
            return Platforms.youtube;

        case lowerUrl.includes('instagram.com'):
            return Platforms.instagram;

        case lowerUrl.includes('tiktok.com'):
            return Platforms.tiktok;

        default:
            return Platforms.unknown;
    }
}

