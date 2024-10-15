const appId = 'u5pWcozRkszZa6trQkNcHdzG-gzGzoHsz';
const appKey = '2Ej07YLEQhCqyVWVVYhsWOxc';
const host = 'u5pwcozr.lc-cn-n1-shared.com';
const tokenUrl = `https://${host}/1.1/classes/token?where=${encodeURIComponent(JSON.stringify({ key: "github" }))}&limit=1`;
const musicUrl = 'https://api.github.com/repos/1505494529/music-player/contents/music';

fetch(tokenUrl, {
    headers: {
        'X-LC-Id': appId,
        'X-LC-Key': appKey,
        'Content-Type': 'application/json'
    }
}).then(res => res.json()).then(data => {
    const token = data.results[0]?.value;

    fetch(musicUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json'
        }
    }).then(res => res.json()).then(data => {
        const songs = data.map(item => item.name);
        let songIndex = 0;
        const audio = document.getElementById('audio');
        const playBtn = document.getElementById('playBtn');
        const songTitle = document.getElementById('songTitle');

        const loadSong = song => {
            audio.src = `music/${song}`;
            songTitle.textContent = song;
        };

        loadSong(songs[songIndex]);

        playBtn.onclick = () => {
            audio.paused ? audio.play() : audio.pause();
            playBtn.textContent = audio.paused ? 'Play' : 'Pause';
        };

        document.getElementById('prevBtn').onclick = () => {
            songIndex = (songIndex - 1 + songs.length) % songs.length;
            loadSong(songs[songIndex]);
            audio.play();
        };

        document.getElementById('nextBtn').onclick = () => {
            songIndex = (songIndex + 1) % songs.length;
            loadSong(songs[songIndex]);
            audio.play();
        };
    });
});
