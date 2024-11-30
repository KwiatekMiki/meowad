const profilePicture = "https://lh3.googleusercontent.com/uKLDTLmDr98dhxSjpNa3X4BuLLcPRLncbY9KCvPodXuIg4-Hj0hYfZWcRc29td0Aksm1EoQgHqYA3lf8wlzvugXnAs0"
const imageLink = "https://pbs.twimg.com/media/GMLPkawXcAAvWiQ?format=jpg&name=small"

function getAds() {
    const ads = [];
    document.querySelectorAll("article[data-testid=tweet]:not(.meowified)").forEach((tweet) => {
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

        tweet.querySelectorAll("div:has(> img)").forEach((imagediv) => {
            const image = imagediv.querySelector("div[style*=twimg]:not([style*=profile_images])");
            if (image) {
                image.style.backgroundImage = `url(${imageLink})`;
                image.style.backgroundSize = "100% 100%";
            }
        })

        tweet.querySelectorAll(":has(> video > source)").forEach((videocontainer) => {
            const video = videocontainer.querySelector("video");
            video.setAttribute("poster", imageLink);
            document.querySelectorAll("source").forEach((source) => {
                source.removeAttribute("src");
            });

            const videocontainerHTML = videocontainer.innerHTML;
            videocontainer.innerHTML = "";
            videocontainer.innerHTML = videocontainerHTML;
        })

        if (pfp) { pfp.style.backgroundImage = `url(${profilePicture})`; }
        if (displayname) { displayname.innerText = ":3"; }
        if (handle) { handle.innerText = "@twitter"; }

        if (tweetText) {
            tweetText.innerText = `meow meow mrrow meow mprrr :3 mrow meow :3 mrowww mrrrow :3

mrow meow purrrrr :3 mrow meow mrrrow mrowwww meow meow mrrrrrr mrowww mrow meow purrrrr :3 mrow meow purrrrr meow purrrrr meow

meoww mrrow :3 purrrrr meow :3 meow mrow meowww mrrrow :3`;
        }

        if (cardcontainer && card) {
            const cardlink = cardcontainer.querySelector("a[dir=ltr]");
            if (cardlink) {
                cardlink.innerText = "From twitter.com";
            }

            card.querySelectorAll("div[dir=ltr] > span").forEach((cardTitle) => {
                cardTitle.innerHTML = ":3";
            });
        }
    })
}

setInterval(replaceAds, 500)