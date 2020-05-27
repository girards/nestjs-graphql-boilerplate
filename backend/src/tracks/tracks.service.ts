import { Injectable } from "@nestjs/common";
import { TrackRepository } from "./tracks.repository";
import { User } from "../users/users.entity";
import { Track } from "./tracks.entity";

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async createTrack(
    userId: User["id"],
    trackName: Track["name"],
  ): Promise<Track> {
    return this.trackRepository
      .create({ owner: userId, name: trackName })
      .save();
  }
}
