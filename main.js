const advertiser = {
    displayName: ":3",
    handle: "@twitter",
    profilePicture: "https://lh3.googleusercontent.com/uKLDTLmDr98dhxSjpNa3X4BuLLcPRLncbY9KCvPodXuIg4-Hj0hYfZWcRc29td0Aksm1EoQgHqYA3lf8wlzvugXnAs0",
}

const ad = {
    content: `meow meow mrrow meow mprrr :3 mrow meow :3 mrowww mrrrow :3

mrow meow purrrrr :3 mrow meow mrrrow mrowwww meow meow mrrrrrr mrowww mrow meow purrrrr :3 mrow meow purrrrr meow purrrrr meow

meoww mrrow :3 purrrrr meow :3 meow mrow meowww mrrrow :3`,
    image: "https://pbs.twimg.com/media/GMLPkawXcAAvWiQ?format=jpg&name=small",
    videoPoster: "https://pbs.twimg.com/media/GMLPkawXcAAvWiQ?format=jpg&name=small",
    card: {
        from: "twitter.com",
        text: ":3"
    }
}

// ONLY LOWERCASE HANDLES
const ignoredAdvertisers = [
    "chiitan7407", "chiitan_osaka", "kyushu_chiitan", "chiitanmomiji",
    "dhiitannagoya", "thailandchiitan"
]

function getAds() {
    const ads = [];
    document.querySelectorAll("article[data-testid=tweet]:not(.meowified)").forEach((tweet) => {
        // ads.push(tweet); return;
        const span = tweet.querySelector("div.r-1kkk96v span.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3");
        if (span && span.innerText === "Ad") {
            ads.push(tweet);
        }
    });
    return ads;
}

function replaceAds() {
    getAds().forEach((tweet) => {
        tweet.classList.add("meowified");

        const pfp = tweet.querySelector("[style*=profile_images]");
        const tweetText = tweet.querySelector("[data-testid=tweetText]");

        const cardcontainer = tweet.querySelector("div:has(> [data-testid='card.wrapper'])");
        const card = cardcontainer?.querySelector("[data-testid='card.wrapper']");

        const profile = tweet.querySelector("[data-testid=User-Name]");
        const displayname = profile.querySelector("a:not([tabindex='-1']) span");
        const handle = profile.querySelector("a[tabindex='-1'] span");
        const handleText = handle.innerText.toLowerCase().replace("@", "");
        if (ignoredAdvertisers.includes(handleText)) { return }

        tweet.querySelectorAll("div:has(> img)").forEach((imageContainer) => {
            const imageDiv = imageContainer.querySelector("div[style*=twimg]:not([style*=profile_images])");
            if (imageDiv) {
                imageDiv.style.backgroundImage = `url(${ad.image})`;
                imageDiv.style.backgroundSize = "100% 100%";
            }

            const image = imageContainer.querySelector("div[style*=twimg]:not([style*=profile_images])");
            if (image) {
                image.setAttribute("src", ad.image);
            }
        })

        tweet.querySelectorAll(":has(> video > source)").forEach((videoContainer) => {
            const video = videoContainer.querySelector("video");
            video.setAttribute("poster", ad.videoPoster);
            document.querySelectorAll("source").forEach((source) => {
                source.removeAttribute("src");
            });

            const _videocontainer = videoContainer.innerHTML;
            videoContainer.innerHTML = "";
            videoContainer.innerHTML = _videocontainer;
        })

        if (pfp) { pfp.style.backgroundImage = `url(${advertiser.profilePicture})` }
        if (displayname) { displayname.innerText = advertiser.displayName }
        if (handle) { handle.innerText = advertiser.handle }
        if (tweetText) { tweetText.innerText = ad.content }

        if (cardcontainer && card) {
            const cardlink = cardcontainer.querySelector("a[dir=ltr]");
            if (cardlink) {
                cardlink.innerText = `From ${ad.card.from}`;
            }

            card.querySelectorAll("div[dir=ltr] > span").forEach((cardTitle) => {
                cardTitle.innerHTML = ad.card.text;
            });
        }
    })
}

setInterval(replaceAds, 500)