import analyzeUrl from "@/lib/analyze_url"

const testSets = [
  { url: "https://service.media.org/de/page/202565", host: "media.org" },

  { url: "https://www.instagram.com", host: "instagram.com", service: "instagram" },
  { url: "https://www.instagram.com/janschmitt/", host: "instagram.com", username: "janschmitt", type: "profile", service: "instagram" },
  { url: "https://www.instagram.com/p/BYYb1hFlpik/?taken-by=janschmitt", host: "instagram.com", username: "janschmitt", type: "photo", service: "instagram" },

  { url: "https://www.flickr.com", host: "flickr.com", service: "flickr" },
  { url: "https://www.flickr.com/people/545022251@N07/", host: "flickr.com", username: "545022251@N07", type: "profile", service: "flickr" },
  { url: "https://www.flickr.com/photos/545022251@N07/sets/71117615851435931/with/36885343031/", host: "flickr.com", username: "545022251@N07", type: "photo-album", service: "flickr" },
  { url: "https://www.flickr.com/photos/545022251@N07/36116114314/in/album-72358683854435931/", host: "flickr.com", username: "545022251@N07", type: "photo", service: "flickr" },
  { url: "https://www.flickr.com/photos/545022251@N07/", host: "flickr.com", username: "545022251@N07", type: "photos", service: "flickr" },
  { url: "https://www.flickr.com/photos/545022251@N07/albums/with/71157185250335432", host: "flickr.com", username: "545022251@N07", type: "photo-albums", service: "flickr" },

  { url: "https://www.youtube.com", host: "youtube.com", service: "youtube" },
  { url: "https://www.youtube.com/watch?v=zwmzewiv5zz", host: "youtube.com", type: "video", service: "youtube" },
  { url: "https://www.youtube.com/channel/zzsTcErHzzoDvzzTzoxxsYYNw", host: "youtube.com", type: "profile", service: "youtube" },
  { url: "https://www.youtube.com/channel/zxJ83wAzzL-e-JVxxlDBexZx/about", host: "youtube.com", type: "profile", service: "youtube" },
  { url: "https://www.youtube.com/user/somechannel/videos", host: "youtube.com", username: "somechannel", type: "profile", service: "youtube" },

  { url: "https://twitter.com", host: "twitter.com", service: "twitter" },
  { url: "https://twitter.com/", host: "twitter.com", service: "twitter" },
  { url: "https://twitter.com/account", host: "twitter.com", username: "account", type: "profile", service: "twitter" },
  { url: "https://twitter.com/123456789012345", host: "twitter.com", username: "123456789012345", type: "profile", service: "twitter" },
  { url: "https://twitter.com/123456789012345/", host: "twitter.com", username: "123456789012345", type: "profile", service: "twitter" },
  { url: "https://twitter.com/123456789012345/status/101010101010", host: "twitter.com", username: "123456789012345", type: "post", service: "twitter" },
  { url: "https://twitter.com/i/moments/777455745471747271", host: "twitter.com", type: "moments", service: "twitter" },

  { url: "https://www.facebook.com", host: "facebook.com", service: "facebook" },
  { url: "https://www.facebook.com/", host: "facebook.com", service: "facebook" },
  { url: "https://www.facebook.com/jan.x.y.6?fref=st", host: "facebook.com", username: "jan.x.y.6", type: "profile", service: "facebook" },
  { url: "https://www.facebook.com/jung.x.55/", host: "facebook.com", username: "jung.x.55", type: "profile", service: "facebook" },
  { url: "https://www.facebook.com/profile.php?id=100008487486545", host: "facebook.com", type: "profile", username: "100008487486545", service: "facebook" },
  { url: "https://www.facebook.com/SomeProfile/posts/222229877086558", host: "facebook.com", username: "SomeProfile", type: "post" },
  { url: "https://www.facebook.com/events/326672687883536", host: "facebook.com", type: "event", service: "facebook" },
  { url: "https://www.facebook.com/?sw_fnr_id=1398574964&fnr_t=12", host: "facebook.com", service: "facebook" },
  { url: "https://www.facebook.com/someAccount/photos/pcb.7755266797833387/7755247827835277/?type=3&theater", host: "facebook.com", username: "someAccount", type: "photo", service: "facebook" },
  { url: "https://www.facebook.com/photo.php?fbid=280345495647903&set=pb.100110473647229.-2207520000.1505483254.&type=3&theater", host: "facebook.com", type: "photo", service: "facebook" },
  { url: "https://www.facebook.com/photo.php?fbid=1837582253234673&set=a.1403183660007870.1073741827.100009487486545&type=3&source=11&referrer_profile_id=100009487486545", host: "facebook.com", type: "photo", service: "facebook" },
  { url: "https://www.facebook.com/SomeAccountName/posts/458691937573734", host: "facebook.com", type: "post", username: "SomeAccountName", service: "facebook" },
  { url: "https://www.facebook.com/Hannes.Alzah?hc_ref=ARQwHmr3xGSczg3dYwp-3cznymS5kOQP07-gGzXBkh2YfULVzkBIpxAhO-t2kPD7MNE", host: "facebook.com", type: "profile", username: "Hannes.Alzah", service: "facebook" },
  { url: "https://www.facebook.com/permalink.php?story_fbid=177773221076270&id=246327177703661", host: "facebook.com", type: "post", username: "246327177703661", service: "facebook" },
  { url: "https://www.facebook.com/JustAnotherUser/videos/447153363271601/", host: "facebook.com", type: "video", username: "JustAnotherUser", service: "facebook" },
  { url: "https://www.facebook.com/JustAnotherUser/posts/2263169823440171?comment_id=1237643153632516&comment_tracking=%3B%21tn%12%4A%12X7%12%3D", host: "facebook.com", type: "comment", username: "JustAnotherUser", service: "facebook" },
  { url: "https://www.facebook.com/JustAnotherUser/photos/a.770677387767431.5233446831.480411711882258/2291776581131101/?type=3&comment_id=1184177691680089&reply_comment_id=2783783938115732&comment_tracking=%3B%12tn%12%3B%21X0%12%3D", host: "facebook.com", type: "comment", username: "JustAnotherUser", service: "facebook" },
  { url: "https://www.facebook.com/JustAnotherUser/videos/1778107324157351/?comment_id=1784622311353712&comment_tracking=%3B%12tn%12%4A%21Z3%12%3D", host: "facebook.com", type: "comment", username: "JustAnotherUser", service: "facebook" },

  { url: "https://www.bitchute.com/channel/aUser/", host: "bitchute.com", type: "profile", username: "aUser", service: "bitchute" },
  { url: "https://www.bitchute.com/video/ab6E3xcd1n2b/", host: "bitchute.com", type: "video", service: "bitchute" },

  { url: "https://some-user.tumblr.com/post/112134567241/the-post-title", host: "tumblr.com", type: "post", username: "some-user", service: "tumblr" },
  { url: "https://some-user.tumblr.com", host: "tumblr.com", type: "profile", username: "some-user", service: "tumblr" },

  { url: "https://gab.ai/someuser", host: "gab.ai", type: "profile", username: "someuser", service: "gab" },
  { url: "https://gab.ai/someuser/posts/10071518", host: "gab.ai", type: "post", username: "someuser", service: "gab" },
  { url: "https://gab.ai/hash/Somehash", host: "gab.ai", type: null, username: null, service: "gab" },
  { url: "https://gab.ai/tv", host: "gab.ai", type: null, username: null, service: "gab" },
  { url: "https://gab.ai/popular", host: "gab.ai", type: null, username: null, service: "gab" },
  { url: "https://gab.ai/news/1711", host: "gab.ai", type: null, username: null, service: "gab" },
  { url: "https://gab.ai/topics", host: "gab.ai", type: null, username: null, service: "gab" },
  { url: "https://gab.ai/topic/343f9581-81dx-33x7-9b1x-76321b16cx17", host: "gab.ai", type: null, username: null, service: "gab" },
  { url: "https://gab.ai/search/something", host: "gab.ai", type: null, username: null, service: "gab" },
]

for (const testSet of testSets) {
  Object.keys(testSet).forEach(key => {
    if (key == "url") { return }

    const value = testSet[key]

    test(`detects :${key} with value '${value}' for '${testSet.url}'`, () => {
      const analysis = analyzeUrl(testSet.url)

      if (value === null) {
        expect(analysis[key]).toBeNull()
      } else {
        expect(analysis[key]).toEqual(value)
      }
    })
  })
}
