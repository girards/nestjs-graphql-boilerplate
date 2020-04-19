import { Get, Controller, Res } from "@nestjs/common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller('')
export class AppController {
  constructor(private readonly configService: ConfigService) {

  }

  @Get()
  healthz(@Res() res: Response): void {
    res.json({ branch: this.configService.get<string>('BRANCH') || "localhost" });

  }
}