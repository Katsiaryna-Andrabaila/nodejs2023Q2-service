import { Injectable } from '@nestjs/common';
import { Album, Artist, DB, Favorites, Track } from './entities/db.entity';
import { User } from './entities/db.entity';

@Injectable()
export class DbService {
  db: DB = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favs: { artists: [], albums: [], tracks: [] },
  };

  getUsers() {
    const users = this.db.users;
    return users.map((el) => ({
      id: el.id,
      login: el.login,
      version: el.version,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt,
    }));
  }

  getUserById(id: string) {
    const user = this.db.users.find((el) => el.id === id);

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  addUser(entity: User) {
    this.db.users.push(entity);

    const user = this.db.users[this.db.users.length - 1];

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  updateUser(id: string, newPassword: string) {
    const user = this.db.users.find((el) => el.id === id);
    user.password = newPassword;

    return {
      id: user.id,
      login: user.login,
      version: user.version++,
      createdAt: user.createdAt,
      updatedAt: Date.now(),
    };
  }

  deleteUser(id: string) {
    const userIndex = this.db.users.indexOf(
      this.db.users.find((el) => el.id === id),
    );
    this.db.users.splice(userIndex, 1);
  }

  getArtists() {
    return this.db.artists;
  }

  getArtistById(id: string) {
    return this.db.artists.find((el) => el.id === id);
  }

  addArtist(entity: Artist) {
    this.db.artists.push(entity);
  }

  updateArtist(id: string, body: Omit<Artist, 'id'>) {
    let artist = this.db.artists.find((el) => el.id === id);
    artist = { ...body, id };

    return artist;
  }

  deleteArtist(id: string) {
    const userIndex = this.db.artists.indexOf(
      this.db.artists.find((el) => el.id === id),
    );
    this.db.artists.splice(userIndex, 1);
  }

  getTracks() {
    return this.db.tracks;
  }

  getTrackById(id: string) {
    return this.db.tracks.find((el) => el.id === id);
  }

  addTrack(entity: Track) {
    this.db.tracks.push(entity);
  }

  updateTrack(id: string, body: Omit<Track, 'id'>) {
    let track = this.db.tracks.find((el) => el.id === id);
    track = { ...body, id };

    return track;
  }

  deleteTrack(id: string) {
    const userIndex = this.db.tracks.indexOf(
      this.db.tracks.find((el) => el.id === id),
    );
    this.db.tracks.splice(userIndex, 1);
  }

  getAlbums() {
    return this.db.albums;
  }

  getAlbumById(id: string) {
    return this.db.albums.find((el) => el.id === id);
  }

  addAlbum(entity: Album) {
    this.db.albums.push(entity);
  }

  updateAlbum(id: string, body: Omit<Album, 'id'>) {
    let album = this.db.albums.find((el) => el.id === id);
    album = { ...body, id };

    return album;
  }

  deleteAlbum(id: string) {
    const userIndex = this.db.albums.indexOf(
      this.db.albums.find((el) => el.id === id),
    );
    this.db.albums.splice(userIndex, 1);
  }

  getFavs() {
    const artists = this.db.favs.artists.forEach((el) =>
      this.db.artists.filter((item) => item.id === el),
    );

    const albums = this.db.favs.albums.forEach((el) =>
      this.db.albums.filter((item) => item.id === el),
    );

    const tracks = this.db.favs.tracks.forEach((el) =>
      this.db.tracks.filter((item) => item.id === el),
    );

    return { artists, albums, tracks };
  }

  addFav(key: keyof Favorites, entity: string) {
    this.db.favs[key].push(entity);
  }

  deleteFav(key: keyof Favorites) {
    delete this.db.favs[key];
  }
}
