import { TrackService } from "../tracks.service";
import { TestingModule, Test } from "@nestjs/testing";
import { Track } from "../tracks.entity";
import { TrackRepository } from "../tracks.repository";
import { getRepositoryToken } from "@nestjs/typeorm";

const track: Track = {
  id: "befc874b-6cb4-4713-a53c-10dbb04624b7",
  createdAt: new Date("2020-04-08 20:53:58.824079"),
  updatedAt: new Date("2020-04-08 20:57:15.111273"),
  version: 2,
  name: "best Track",
  owner: "abd0250b-6cb4-4713-a53c-10dbb04624b7",
  hasId: () => true,
  save: () => Promise.resolve(track),
  remove: () => Promise.resolve(track),
  reload: () => Promise.resolve(),
};

describe("TracksService", () => {
  let trackService: TrackService;
  let trackRepository: TrackRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackService,
        {
          provide: getRepositoryToken(Track),
          useClass: TrackRepository,
        },
      ],
    }).compile();

    trackService = module.get<TrackService>(TrackService);
    trackRepository = module.get<TrackRepository>(getRepositoryToken(Track));
  });

  it("should be defined", () => {
    expect(trackService).toBeDefined();
  });

  describe("track creation", () => {
    it("should create a new tracks", async () => {
      jest
        .spyOn(trackRepository, "create")
        .mockImplementationOnce((trackInput) => {
          return Object.assign(track, {
            name: trackInput.name,
            owner: trackInput.owner,
          });
        });
      await expect(
        trackService.createTrack(
          "aaaaaaaa-6cb4-4713-a53c-10dbb04624b7",
          "loliloli",
        ),
      ).resolves.toEqual({
        ...track,
        name: "loliloli",
        owner: "aaaaaaaa-6cb4-4713-a53c-10dbb04624b7",
      });
    });

    it("should get tracks by users", async () => {});
  });
});
