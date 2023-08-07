/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./user/dto/create-user.dto"), { "CreateUserDto": { login: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./user/dto/update-user.dto"), { "UpdateUserDto": { oldPassword: { required: true, type: () => String }, newPassword: { required: true, type: () => String } } }], [import("./track/dto/create-track.dto"), { "CreateTrackDto": { name: { required: true, type: () => String }, artistId: { required: true, type: () => String, nullable: true }, albumId: { required: true, type: () => String, nullable: true }, duration: { required: true, type: () => Number } } }], [import("./track/dto/update-track.dto"), { "UpdateTrackDto": { name: { required: true, type: () => String }, artistId: { required: true, type: () => String, nullable: true }, albumId: { required: true, type: () => String, nullable: true }, duration: { required: true, type: () => Number } } }], [import("./album/dto/create-album.dto"), { "CreateAlbumDto": { name: { required: true, type: () => String }, year: { required: true, type: () => Number }, artistId: { required: true, type: () => String, nullable: true } } }], [import("./album/dto/update-album.dto"), { "UpdateAlbumDto": { name: { required: true, type: () => String }, year: { required: true, type: () => Number }, artistId: { required: true, type: () => String, nullable: true } } }], [import("./artist/dto/create-artist.dto"), { "CreateArtistDto": { name: { required: true, type: () => String }, grammy: { required: true, type: () => Boolean } } }], [import("./artist/dto/update-artist.dto"), { "UpdateArtistDto": { name: { required: true, type: () => String }, grammy: { required: true, type: () => Boolean } } }], [import("./album/entities/album.entity"), { "Album": {} }], [import("./artist/entities/artist.entity"), { "Artist": {} }], [import("./track/entities/track.entity"), { "Track": {} }], [import("./user/entities/user.entity"), { "User": {} }]], "controllers": [[import("./user/user.controller"), { "UserController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./track/track.controller"), { "TrackController": { "create": {}, "findAll": { type: [Object] }, "findOne": {}, "update": {}, "remove": {} } }], [import("./album/album.controller"), { "AlbumController": { "create": {}, "findAll": { type: [Object] }, "findOne": {}, "update": {}, "remove": {} } }], [import("./artist/artist.controller"), { "ArtistController": { "create": {}, "findAll": { type: [Object] }, "findOne": {}, "update": {}, "remove": {} } }]] } };
};