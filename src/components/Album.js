import React, { Component } from 'react';
import albumData from './../data/albums';

const itemStyle = {

}

class Album extends Component {
  constructor(props){
    super(props);
    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    })

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      play: false,
      hovered: album.songs[0]
    };

    this.toggleHoverPlayOn = this.toggleHoverPlayOn.bind(this)
    this.toggleHoverPlayOff = this.toggleHoverPlayOn.bind(this)

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }
  toggleHoverPlayOn(song){
    this.setState({play: true, hovered: song })
    console.log('current hovered song: ', this.state.hovered)
  }

  toggleHoverPlayOff() {
    this.setState({play: false})
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); } 
      this.play();
    }
  }

  isPlaying(song,index) {
    if(this.state.currentSong === song && this.state.isPlaying){
      return <span className="ion-md-pause"></span>;
    } else if (this.state.hovered === song && this.state.play === true){
      return <span className="ion-md-play"></span>;
    } else {
      return <span>{index + 1}</span>;
    }
  }

  render(){
    return(
      <section className="album">
          <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
            <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
              {
                this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                  <td onMouseEnter={() => this.toggleHoverPlayOn(song)} onMouseLeave={this.toggleHoverPlayOff}>
                  {this.isPlaying(song,index)}</td>
                  <td onMouseEnter={() => this.toggleHoverPlayOn(song)} onMouseLeave={this.toggleHoverPlayOff}>{song.title}</td>
                  <td onMouseEnter={() => this.toggleHoverPlayOn(song)} onMouseLeave={this.toggleHoverPlayOff}>{song.duration}</td>
                </tr>
                )
              }
           </tbody>
         </table>
      </section>
    );
  }
}

export default Album;