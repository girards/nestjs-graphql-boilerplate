import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrackService } from "./tracks.service";
import { Track } from "./tracks.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TrackService],
})
export class TrackModule {}
