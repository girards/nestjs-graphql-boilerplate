import { Get, Controller, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('')
export class AppController {
  @Get()
  healthz(@Res() res: Response): void {
    res.sendStatus(200);
  }
}