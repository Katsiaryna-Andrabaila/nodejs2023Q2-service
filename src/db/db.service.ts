import { Injectable } from '@nestjs/common';
import { Album, Artist, DB, Favorites, Track } from './entities/db.entity';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

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

    return user
      ? {
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      : null;
  }

  addUser(entity: CreateUserDto) {
    const newUser = {
      id: randomUUID(),
      password: entity.password,
      login: entity.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.users.push(newUser);

    const user = this.db.users[this.db.users.length - 1];

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  updateUser(id: string, body: UpdateUserDto) {
    const { oldPassword, newPassword } = body;
    const user = this.db.users.find((el) => el.id === id);

    if (user && oldPassword === user.password) {
      user.password = newPassword;

      return {
        id: user.id,
        login: user.login,
        version: ++user.version,
        createdAt: user.createdAt,
        updatedAt: Date.now(),
      };
    } else if (user && oldPassword !== user.password) {
      return 'wrong';
    } else {
      return null;
    }
  }

  deleteUser(id: string) {
    const user = this.db.users.find((el) => el.id === id);
    if (user) {
      const userIndex = this.db.users.indexOf(user);
      this.db.users.splice(userIndex, 1);
      return 'ok';
    } else {
      return null;
    }
  }

  getArtists() {
    return this.db.artists;
  }

  getArtistById(id: string) {
    return this.db.artists.find((el) => el.id === id);
  }

  addArtist(entity: Artist) {
    this.db.artists.push(entity);
    return this.db.artists[this.db.artists.length - 1];
  }

  updateArtist(id: string, body: Omit<Artist, 'id'>) {
    let artist = this.db.artists.find((el) => el.id === id);
    artist = { ...body, id };

    return artist;
  }

  deleteArtist(id: string) {
    const artistIndex = this.db.artists.indexOf(
      this.db.artists.find((el) => el.id === id),
    );
    this.db.artists.splice(artistIndex, 1);

    if (this.db.favs.artists.includes(id)) {
      this.db.favs.artists.splice(this.db.favs.artists.indexOf(id), 1);
    }
  }

  getTracks() {
    return this.db.tracks;
  }

  getTrackById(id: string) {
    return this.db.tracks.find((el) => el.id === id);
  }

  addTrack(entity: Omit<Track, 'id'>) {
    const newTrack = {
      id: randomUUID(),
      ...entity,
    };
    this.db.tracks.push(newTrack);

    return this.db.tracks[this.db.tracks.length - 1];
  }

  updateTrack(id: string, body: Omit<Track, 'id'>) {
    let track = this.db.tracks.find((el) => el.id === id);

    if (track) {
      track = { ...body, id };

      return track;
    } else {
      return null;
    }
  }

  deleteTrack(id: string) {
    const track = this.db.tracks.find((el) => el.id === id);

    if (track) {
      const trackIndex = this.db.tracks.indexOf(
        this.db.tracks.find((el) => el.id === id),
      );
      this.db.tracks.splice(trackIndex, 1);

      if (this.db.favs.tracks.includes(id)) {
        this.db.favs.tracks.splice(this.db.favs.tracks.indexOf(id), 1);
      }
      return 'ok';
    } else {
      return null;
    }
  }

  getAlbums() {
    return this.db.albums;
  }

  getAlbumById(id: string) {
    return this.db.albums.find((el) => el.id === id);
  }

  addAlbum(entity: Omit<Album, 'id'>) {
    const newAlbum = {
      id: randomUUID(),
      ...entity,
    };
    this.db.albums.push(newAlbum);

    return this.db.albums[this.db.albums.length - 1];
  }

  updateAlbum(id: string, body: Omit<Album, 'id'>) {
    let album = this.db.albums.find((el) => el.id === id);

    if (album) {
      album = { ...body, id };

      return album;
    } else {
      return null;
    }
  }

  deleteAlbum(id: string) {
    const album = this.db.albums.find((el) => el.id === id);

    if (album) {
      const albumIndex = this.db.albums.indexOf(
        this.db.albums.find((el) => el.id === id),
      );
      this.db.albums.splice(albumIndex, 1);

      this.db.tracks.forEach((el, i, arr) => {
        if (el.albumId === id) {
          arr[i] = { albumId: null, ...el };
        }
      });

      if (this.db.favs.albums.includes(id)) {
        this.db.favs.albums.splice(this.db.favs.albums.indexOf(id), 1);
      }

      return 'ok';
    } else {
      return null;
    }
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
