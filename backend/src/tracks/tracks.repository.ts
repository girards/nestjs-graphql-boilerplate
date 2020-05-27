import { EntityRepository, Repository } from "typeorm";
import { Track } from "./tracks.entity";

@EntityRepository(Track)
export class TrackRepository extends Repository<Track> {}
