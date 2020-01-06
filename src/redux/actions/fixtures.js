

// iTunes.getTracks({
//   fields: ['persistentId', 'title', 'artist', 'albumTitle', 'genre', 'artwork', 'lyrics', 'duration', 'assetUrl']
// }).then((tracks) => {

// }).catch(error => {
//   alert(error)
// });

// const songs = await iTunes.getTracks({
//   fields: ['persistentId', 'title', 'artist', 'albumTitle', 'genre', 'artwork', 'lyrics', 'duration', 'assetUrl']
// });

async function getSongs() {
  const songs = await Promise.resolve([
    {
      title: 'Promises',
      artist: 'Wiz Khalifa',
      // albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
      assetUrl: require("../../assets/flora_secret.mp3"),
      persistentId: 1,
      album: "Kamikazee"
    },
    {
      title: '...Ready For It?',
      artist: 'Taylor Swift',
      albumArtUrl: "",
      // albumArtUrl: "https://target.scene7.com/is/image/Target/GUEST_608e5972-e6e0-4fef-b66d-4d83f3eb8f56?wid=488&hei=488&fmt=pjpeg",
      assetUrl: require("../../assets/freeStyle.mp3"),
      persistentId: 2,
      album: "Kamikazee"
    },
    {
      title: 'Hotline Bling',
      artist: 'Drake',
      albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
      assetUrl: require("../../assets/flora_secret.mp3"),
      persistentId: 3,
      album: "Kamikazee"
    },
    {
      title: 'Stressed Out',
      artist: 'Twenty One Pilots',
      albumArtUrl: "https://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
      // audioUrl: "/Users/chukwuemekaajima/Music/iTunes/iTunes Media/Music/114_Toni Braxton With Trey Songz/Unknown Album/Yesterday.mp3",
      assetUrl: require("../../assets/freeStyle.mp3"),
      persistentId: 4,
      album: "Kamikazee"
      // audioUrl: "../../assets/flora_secret.mp3",
    },
    {
      title: 'Promises',
      artist: 'Wiz Khalifa',
      albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
      // audioUrl: "../../assets/flora_secret.mp3",
      assetUrl: require("../../assets/flora_secret.mp3"),
      persistentId: 5,
      album: "Rolling papers"
    },
    {
      title: '...Ready For It?',
      artist: 'Taylor Swift',
      // albumArtUrl: "https://target.scene7.com/is/image/Target/GUEST_608e5972-e6e0-4fef-b66d-4d83f3eb8f56?wid=488&hei=488&fmt=pjpeg",
      // audioUrl: "../../assets/flora_secret.mp3",
      assetUrl: require("../../assets/freeStyle.mp3"),
      persistentId: 6,
      album: "Kamikazee"
    },
    {
      title: 'Hotline Bling',
      artist: 'Drake',
      albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
      // audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      assetUrl: require("../../assets/flora_secret.mp3"),
      persistentId: 7,
      album: "go home"
    },
    {
      title: 'PromisesPromisesPromisesPromisesPromisesPromisesPromises',
      artist: 'Wiz Khalifa',
      albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
      // audioUrl: "../../assets/flora_secret.mp3",
      assetUrl: require("../../assets/freeStyle.mp3"),
      persistentId: 8,
      album: "lost in the dark"
    },
    {
      title: 'Hotline Bling',
      artist: 'Drake',
      albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
      // audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      assetUrl: require("../../assets/flora_secret.mp3"),
      persistentId: 9,
      album: "go home"
    },
    {
      title: 'Promises',
      artist: 'Wiz Khalifa',
      albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
      // audioUrl: "../../assets/flora_secret.mp3",
      assetUrl: require("../../assets/freeStyle.mp3"),
      persistentId: 10,
      album: "lost in the dark"
    },
    {
      title: 'Stressed Out',
      artist: 'Twenty One Pilots',
      albumArtUrl: "https://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
      // audioUrl: "/Users/chukwuemekaajima/Music/iTunes/iTunes Media/Music/114_Toni Braxton With Trey Songz/Unknown Album/Yesterday.mp3",
      assetUrl: require("../../assets/flora_secret.mp3"),
      persistentId: 11,
      album: "Rolling papers"
      // audioUrl: "../../assets/flora_secret.mp3",
    },
    {
      title: 'Hotline Bling',
      artist: 'Drake',
      albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
      // audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      assetUrl: require("../../assets/freeStyle.mp3"),
      persistentId: 12,
      album: "Rolling papers"
    },
    {
      title: 'Promises',
      artist: 'Wiz Khalifa',
      albumArtUrl: "https://media.pitchfork.com/photos/5929a9bb5e6ef95969321478/1:1/w_320/f180b23e.jpg",
      // audioUrl: "../../assets/flora_secret.mp3",
      assetUrl: require("../../assets/flora_secret.mp3"),
      persistentId: 13,
      album: "lost in the dark"
    }
  ]);
  return songs;
}

export default getSongs;
