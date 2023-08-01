import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DbModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
